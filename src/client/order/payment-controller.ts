/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
import module = require('./order-module');

class CustomerDetails {
    fullName : string;
    address :string;
    phoneNumber :string;
    email : string;
}

class PaymentController{
    static $inject = ["$state","OrderDataModel","toastr"];

    customerDetails : CustomerDetails;

    constructor(private $state : angular.ui.IStateService,private orderDataModel,private toastr){
        this.customerDetails = new CustomerDetails();
    }

    goToChoosePaymentMethod(){
        this.$state.go("payment.paymentMethod");
    }

    closeByPhone(){
        this.orderDataModel.getOrder().closeOrderByPhone(this.customerDetails).then(()=>{
            this.toastr.success("ההזמנה הושלמה");
            this.orderDataModel.clear();
        });
    }
}
module.controller("payment",PaymentController);
