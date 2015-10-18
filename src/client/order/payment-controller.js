define(["require", "exports", './order-module'], function (require, exports, module) {
    var CustomerDetails = (function () {
        function CustomerDetails() {
        }
        return CustomerDetails;
    })();
    var PaymentController = (function () {
        function PaymentController($state, myOrder, toastr) {
            this.$state = $state;
            this.myOrder = myOrder;
            this.toastr = toastr;
            this.customerDetails = new CustomerDetails();
        }
        PaymentController.prototype.goToChoosePaymentMethod = function () {
            this.$state.go("payment.paymentMethod");
        };
        PaymentController.prototype.closeByPhone = function () {
            var _this = this;
            this.myOrder.getFullOrder().closeOrderByPhone(this.customerDetails).then(function () {
                _this.toastr.success("ההזמנה הושלמה");
            });
        };
        PaymentController.$inject = ["$state", "myOrder", "toastr"];
        return PaymentController;
    })();
    module.controller("payment", PaymentController);
});
