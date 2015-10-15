define(["require", "exports", "angular", "toastr"], function (require, exports, angular, toastr) {
    var app = angular.module("infra", ["ngResource"]);
    app.config(["$httpProvider", function ($httpProvider) {
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
    app.factory("validationErrorInterceptorFactory", validationErrorInterceptorFactory);
    app.factory("peamitResource", ["$resource", "alertsService", function ($resource, alertsService) {
            function addSavedAlert() {
                alertsService.addAlert("נשמר", "success");
            }
            function addDeletedAlert() {
                alertsService.addAlert("נמחק", "success");
            }
            function addFailedAlert() {
                alertsService.addAlert("נכשל", "danger");
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
                    innerReource.put(entity).$promise.then(addSavedAlert, addFailedAlert);
                };
                peamitResource.delete = function (id, callback) {
                    innerReource.delete({ id: id }).$promise.then(function () { addDeletedAlert(); callback(); }, addFailedAlert);
                };
                return peamitResource;
            };
        }]);
    var AlertService = function ($timeout) {
        this.alerts = [];
        this.$timeout = $timeout;
    };
    AlertService.$inject = ["$timeout"];
    AlertService.prototype.addAlert = function (message, alertType) {
        var self = this;
        this.alerts.push({ message: message, type: alertType });
        if (this.timeoutPromise) {
            this.$timeout.cancel(this.timeoutPromise);
        }
        this.timeoutPromise = this.$timeout(function () {
            self.alerts.length = 0;
            self.timeoutPromise = undefined;
        }, 3000);
    };
    app.service("alertsService", AlertService);
    app.controller("alertsController", ["alertsService", function (alertService) {
            this.alerts = alertService.alerts;
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
    app.service("toastr", Toaster);
});
