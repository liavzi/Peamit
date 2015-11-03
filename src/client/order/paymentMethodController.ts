/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
import orderModule = require('./order-module');
import paymentController = require("payment-controller");

class PaymentMethodController{
    static $inject = ["$scope","$http","$sce"];
    paypalButton : string;
    private paymentController :paymentController.PaymentController 

    constructor(private $scope: ng.IScope,private $http: ng.IHttpService,private $sce :ng.ISCEService){
        this.paymentController = $scope["payment"];
        this.$scope.$watch(()=>this.paymentController.paymentMethod,(paymentMethod : number)=>{
           if (paymentMethod == 2){
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

orderModule.app.controller("paymentMethod",PaymentMethodController);
