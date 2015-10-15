define(["require", "exports", './order-module'], function (require, exports, module) {
    var CustomerDetails = (function () {
        function CustomerDetails() {
        }
        return CustomerDetails;
    })();
    var PaymentController = (function () {
        function PaymentController($state, orderDataModel, toastr) {
            this.$state = $state;
            this.orderDataModel = orderDataModel;
            this.toastr = toastr;
            this.customerDetails = new CustomerDetails();
        }
        PaymentController.prototype.goToChoosePaymentMethod = function () {
            this.$state.go("payment.paymentMethod");
        };
        PaymentController.prototype.closeByPhone = function () {
            var _this = this;
            this.orderDataModel.getOrder().closeOrderByPhone(this.customerDetails).then(function () {
                _this.toastr.success("ההזמנה הושלמה");
                _this.orderDataModel.clear();
            });
        };
        PaymentController.$inject = ["$state", "OrderDataModel", "toastr"];
        return PaymentController;
    })();
    module.controller("payment", PaymentController);
});
