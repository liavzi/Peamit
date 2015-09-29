import module = require("./order-module");

class CustomerDetails {
    fullName : string;
    address :string;
    phoneNumber :string;
    email : string;
}

class PaymentController{
    customerDetails : CustomerDetails;

    constructor(){
        this.customerDetails = new CustomerDetails();
    }

    goToChoosePaymentMethod(){
        alert("goToChoosePaymentMethod");
    }
}
module.controller("payment",PaymentController);
