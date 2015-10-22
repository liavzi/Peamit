define(["require", "exports", "angular", "toastr"], function (require, exports, angular, toastr) {
    exports.app = angular.module("infra", ["ngResource"]);
    exports.app.config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push("validationErrorInterceptorFactory");
        }]);
    function validationErrorInterceptorFactory(toastr) {
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
                    toastr.error(formatError(error));
                }
            }
        };
    }
    validationErrorInterceptorFactory.$inject = ["toastr"];
    exports.app.factory("validationErrorInterceptorFactory", validationErrorInterceptorFactory);
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
});
