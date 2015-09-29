define(["require", "exports", "./order-module"], function (require, exports, module) {
    var CustomerDetails = (function () {
        function CustomerDetails() {
        }
        return CustomerDetails;
    })();
    var PaymentController = (function () {
        function PaymentController() {
            this.customerDetails = new CustomerDetails();
        }
        PaymentController.prototype.goToChoosePaymentMethod = function () {
            alert("goToChoosePaymentMethod");
        };
        return PaymentController;
    })();
    module.controller("payment", PaymentController);
});
//# sourceMappingURL=payment-controller.js.map