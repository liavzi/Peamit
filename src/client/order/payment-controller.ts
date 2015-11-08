/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
import orderModule = require('./order-module');

export class CustomerDetails {
    fullName : string;
    address :string;
    phoneNumber :string;
    email : string;
}

export class PaymentController{
    static $inject = ["$state","myOrder","toastr","$scope","$http","$sce"];

    customerDetails : CustomerDetails;
    paymentMethod : string
    paypalButton : string;
    showPaymentOptions :boolean;

    constructor(private $state : angular.ui.IStateService,private myOrder : orderModule.MyOrder,private toastr
    ,private $scope : ng.IScope
    ,private $http : ng.IHttpService
    ,private $sce : ng.ISCEService){
        this.showPaymentOptions = false;
        this.customerDetails = new CustomerDetails();
        this.$scope.$watch(()=>this.paymentMethod,(paymentMethod : string)=>{
           if (paymentMethod === "2" || paymentMethod === "1"){
               this.createPaypalButton();
           } 
        });
    }
    
    createPaypalButton(){
        this.$http.get("/api/myOrder/paypalButton").then(result=>{
            this.paypalButton = this.$sce.trustAsHtml(result.data);
        });
    }

}
orderModule.app.controller("payment",PaymentController);
