define(["require", "exports", './order-module'], function (require, exports, orderModule) {
    var PaymentMethodController = (function () {
        function PaymentMethodController($scope, $http, $sce) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$sce = $sce;
            this.paymentController = $scope["payment"];
            this.$scope.$watch(function () { return _this.paymentController.paymentMethod; }, function (paymentMethod) {
                if (paymentMethod == 2) {
                    _this.createPaypalButton();
                }
            });
        }
        PaymentMethodController.prototype.createPaypalButton = function () {
            var _this = this;
            this.$http.get("/api/myOrder/paypalButton").then(function (result) {
                _this.paypalButton = _this.$sce.trustAsHtml(result.data);
            });
        };
        PaymentMethodController.$inject = ["$scope", "$http", "$sce"];
        return PaymentMethodController;
    })();
    orderModule.controller("paymentMethod", PaymentMethodController);
});
