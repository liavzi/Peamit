define(["require", "exports", './order-module'], function (require, exports, orderModule) {
    var CustomerDetails = (function () {
        function CustomerDetails() {
        }
        return CustomerDetails;
    })();
    exports.CustomerDetails = CustomerDetails;
    var PaymentController = (function () {
        function PaymentController($state, myOrder, toastr, $scope, $http, $sce) {
            var _this = this;
            this.$state = $state;
            this.myOrder = myOrder;
            this.toastr = toastr;
            this.$scope = $scope;
            this.$http = $http;
            this.$sce = $sce;
            this.showPaymentOptions = false;
            this.customerDetails = new CustomerDetails();
            this.$scope.$watch(function () { return _this.paymentMethod; }, function (paymentMethod) {
                if (paymentMethod === "2" || paymentMethod === "1") {
                    _this.createPaypalButton();
                }
            });
        }
        PaymentController.prototype.createPaypalButton = function () {
            var _this = this;
            this.$http.get("/api/myOrder/paypalButton").then(function (result) {
                _this.paypalButton = _this.$sce.trustAsHtml(result.data);
            });
        };
        PaymentController.$inject = ["$state", "myOrder", "toastr", "$scope", "$http", "$sce"];
        return PaymentController;
    })();
    exports.PaymentController = PaymentController;
    orderModule.app.controller("payment", PaymentController);
});
