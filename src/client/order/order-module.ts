///<reference path="../../../typings/angularjs/angular.d.ts"/>

import angular = require("angular");

export var app = angular.module("order",[]);

//Controllers
app.controller('MyOrderController', ['$scope', 'OrderResource',"myOrder","$state", function ($scope, orderResource,myOrder : MyOrder,$state) {
    $scope.orderModel = {};
    $scope.orderModel.order={};
    myOrder.getFullOrder().then(order=>{
        $scope.orderModel.order  =order;
    });
    $scope.closeOrderByPhone = function (){
        myOrder.closeOrderByPhone($scope.orderModel.order.customerDetails).then(function(){
            
        });
    };
    $scope.goToPayment = function(){
        $state.go("payment.customerDetails");
    };
} ]);

app.controller('OrderLineController', ['$scope', 'ProductResource',"myOrder",function ($scope, productResource,myOrder : MyOrder) {
    $scope.product = productResource.getById({id:$scope.orderLine.productId});
    $scope.removeOrderLine = function(){
        myOrder.removeOrderLine($scope.orderLine._id).then(function(order){
            $scope.orderModel.order = order;
        });
    };
} ]);
app.controller("ProductSoldModalController",["$scope","$modalInstance","$state","soldProduct",function ($scope, $modalInstance,$state,soldProduct){
    $scope.soldProduct = soldProduct;
    $scope.pay = function(){
        $modalInstance.close();
        $state.go("payment.myOrder");
    };
}]);

app.controller("closedOrdersController", ["$scope","$location","OrderResource","toastr",function ($scope,$location,orderResource,toastr) {
    var _this = this;
    this.gridOptions ={
        data : [],
        onRegisterApi : function(gridApi){
            _this.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                _this.selectedOrder = row.entity;
            });
        },
        enableFullRowSelection :true,
        enableSelectionBatchEvent :false,
        multiSelect:false,
        noUnselect :true,
        columnDefs : [
            {
                field : "id",
                displayName : "מזהה"
            },
            {
                field : "status",
                displayName : "סטטוס"
            }
        ]
    };
    this.loadOrders = function(){
        this.gridOptions.data = orderResource.getAll();
    };
    this.loadOrders();
    this.editOrder = function(order){
        $location.path("/OrderMaintenance/"+order._id);
    };
    this.deleteOrder = function(order){
        orderResource.delete({orderId:order._id}).$promise.then(function(){
            toastr.success("ההזמנה נמחקה");
            _this.loadOrders();});
    };
}]);

app.controller("orderMaintenance", ["$scope","$routeParams","OrderResource",function ($scope,$routeParams,orderResource) {
    var _this = this;
    var orderId = $routeParams.orderId;
    this.order = orderResource.get({orderId:orderId});
}]);

app.directive("productForSelling",["$modal","myOrder",function($modal,myOrder : MyOrder){
    return {
        restrict : "EA",
        scope : {
            product : "="
        },
        templateUrl : "Views/productForSelling.html",
        controller : function($scope){
            $scope.product.quantity = 0;
        },
        link : function(scope){
            scope.addToCart = function(){
                var saleInfo = {productId: scope.product._id, quantity: scope.product.quantity};
                var itemSoldPromise = myOrder.addItem(saleInfo);           
                var modalInstance = $modal.open({
                    templateUrl:"Views/ProductSoldModal.html",
                    size:"lg",
                    controller : "ProductSoldModalController",
                    resolve : {
                        itemSold : function(){return itemSoldPromise;},
                        soldProduct : function(){return angular.copy(scope.product);}
                    },
                    windowClass : "product-sold-modal"
                });
                scope.product.quantity = 0;

            };
        },
        windowClass  : "center-modal"
    };
}]);

export class MyOrder{
    static $inject = ["$http"];
    constructor(private $http : ng.IHttpService){
    }
    private post(path,postdata){
        return this.$http.post("/api/myOrder/"+path,postdata);
    };
    
    public addItem(saleInfo){
        return this.post("items",saleInfo);
    };
    
    public closeOrderByPhone(customerDetails){
        return this.post("actions/closeOrderByPhone",customerDetails);
    };
    
    public removeOrderLine(orderLineId){
        return this.$http.delete("/api/myOrder/lines/"+orderLineId).then(function(response){return response.data;});
    };      
    
    public getFullOrder(){
        return this.$http.get("api/myOrder").then(res=>res.data);
    }     
}

app.service("myOrder",MyOrder);

//Services

app.factory('OrderResource', ['$resource', function ($resource) {
    return $resource('/api/orders/:orderId', {id : '@_id'},
        {
            'create': { method: 'POST'},
            "getAll": {method:"GET",isArray:true}
        });
} ]);
