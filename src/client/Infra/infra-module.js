define(["require", "exports", "angular", "toastr"], function (require, exports, angular, toastr) {
    exports.app = angular.module("infra", ["ngResource"]);
    exports.app.config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push("blockUiInterceptorFactory", "validationErrorInterceptorFactory");
        }]);
    function validationErrorInterceptorFactory(toastr, $q) {
        function formatError(err) {
            var msgs = [];
            Object.keys(err.errors).forEach(function (key) {
                if (this == this.errors[key])
                    return;
                msgs.push(String(this.errors[key].message));
            }, err);
            return msgs.join(String.fromCharCode(13, 10));
        }
        return {
            responseError: function (response) {
                if (response.status && response.status === 400) {
                    var error = response.data;
                    if (error.name === "ValidationError") {
                        toastr.error(formatError(error));
                    }
                    else if (error.name === "BusinessError") {
                        toastr.error(error.message);
                    }
                }
                return $q.reject(response);
            }
        };
    }
    validationErrorInterceptorFactory.$inject = ["toastr", "$q"];
    exports.app.factory("validationErrorInterceptorFactory", validationErrorInterceptorFactory);
    function blockUiInterceptorFactory($templateCache, $q) {
        var count = 0;
        return {
            request: function (config) {
                if (!(config.method === 'GET' && $templateCache.get(config.url))) {
                    $.blockUI();
                }
                return config;
            },
            response: function (response) {
                $.unblockUI();
                return response;
            },
            responseError: function (response) {
                $.unblockUI();
                return $q.reject(response);
            }
        };
    }
    blockUiInterceptorFactory.$inject = ["$templateCache", "$q"];
    exports.app.factory("blockUiInterceptorFactory", blockUiInterceptorFactory);
    exports.app.factory("peamitResource", ["$resource", "toastr", function ($resource, toastr) {
            function addSavedAlert() {
                toastr.success("נשמר");
            }
            function addDeletedAlert() {
                toastr.success("נמחק");
            }
            function addFailedAlert() {
                toastr.error("נכשל");
            }
            return function (path) {
                var innerReource = $resource("/api/" + path + "/:id", { id: "@_id" }, {
                    'post': { method: "POST" },
                    'put': { method: 'PUT' },
                    'getAll': { method: 'GET', isArray: true },
                    "getById": { method: "GET" }
                });
                var peamitResource = Object.create(innerReource);
                peamitResource.put = function (entity) {
                    return innerReource.put(entity).$promise.then(addSavedAlert, addFailedAlert);
                };
                peamitResource.delete = function (id) {
                    return innerReource.delete({ id: id }).$promise.then(addDeletedAlert, addFailedAlert);
                };
                return peamitResource;
            };
        }]);
    var Toaster = (function () {
        function Toaster() {
        }
        Toaster.prototype.success = function (message) {
            toastr.success(message);
        };
        Toaster.prototype.error = function (message) {
            toastr.error(message);
        };
        return Toaster;
    })();
    exports.Toaster = Toaster;
    exports.app.service("toastr", Toaster);
    exports.app.filter("sanitize", ['$sce', function ($sce) {
            return function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };
        }]);
    /**
     * AngularJS default filter with the following expression:
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */
    exports.app.filter('orFilter', function () {
        return function (items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                    if (itemMatches) {
                        out.push(item);
                    }
                });
            }
            else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        };
    });
});
