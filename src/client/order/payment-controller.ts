/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
import orderModule = require('./order-module');

export class CustomerDetails {
    fullName : string;
    address :string;
    phoneNumber :string;
    email : string;
}

export class PaymentController{
    static $inject = ["$state","myOrder","toastr"];

    customerDetails : CustomerDetails;
    paymentMethod : number

    constructor(private $state : angular.ui.IStateService,private myOrder,private toastr){
        this.customerDetails = new CustomerDetails();
    }

    goToChoosePaymentMethod(){
        this.$state.go("payment.paymentMethod");
    }

    closeByPhone(){
        this.myOrder.closeOrderByPhone(this.customerDetails).then(()=>{
            this.toastr.success("ההזמנה הושלמה");
        });
    }
}
orderModule.controller("payment",PaymentController);
