///<reference path="../../../typings/angularjs/angular.d.ts"/>

import angular = require("angular");

var app = angular.module("order",[]);

//Controllers
app.controller('MyOrderController', ['$scope', 'OrderResource',"OrderDataModel","$state", function ($scope, orderResource,orderDataModel,$state) {
    $scope.orderModel = {};
    var order = orderDataModel.getOrder();
    if (order)
        $scope.orderModel.order  =orderResource.get({orderId:order.id});
    $scope.closeOrderByPhone = function (){
        orderDataModel.getOrder().closeOrderByPhone($scope.orderModel.order.customerDetails).then(function(){
            orderDataModel.clear();
        });
    };
    $scope.goToPayment = function(){
        $state.go("payment.customerDetails");
    };
} ]);

app.controller('OrderLineController', ['$scope', 'ProductResource',"OrderDataModel",function ($scope, productResource,orderDataModel) {
    $scope.product = productResource.getById({id:$scope.orderLine.productId});
    $scope.removeOrderLine = function(){
        orderDataModel.getOrder().removeOrderLine($scope.orderLine._id).then(function(order){
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
                field : "state",
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

app.directive("productForSelling",["$modal","OrderDataModel",function($modal,orderDataModel){
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
                var itemSoldPromise = orderDataModel.getOrCreateOrder().then(function(order) {
                    return order.addItem(saleInfo);
                });
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

function Order(orderId,$http){
    this.id = orderId;
    this._$http = $http;
}

Order.prototype._post = function(path,postdata){
    return this._$http.post("/api/orders/"+this.id+"/"+path,postdata);
};

Order.prototype.addItem = function(saleInfo){
    return this._post("items",saleInfo);
};

Order.prototype.closeOrderByPhone = function(customerDetails){
    return this._post("actions/closeOrderByPhone",customerDetails);
};

Order.prototype.removeOrderLine = function(orderLineId){
    return this._$http.delete("/api/orders/"+this.id+"/lines/"+orderLineId).then(function(response){return response.data;});
};

//Services
(<any> OrderDataModelFactory).$inject = ["OrderResource","$q","$http"];
function OrderDataModelFactory(orderResource,$q,$http){
    var orderDataModel : any = {};
    orderDataModel.initialize = function(){
        var orderIdFromLocalStorage = localStorage.getItem("orderId");
        if (orderIdFromLocalStorage)
            this._setOrder(orderIdFromLocalStorage);
    };
    orderDataModel._setOrder = function(orderId){
        this.order = new Order(orderId,$http);
        localStorage.setItem("orderId",orderId);
    };
    orderDataModel.getOrCreateOrder= function(){
        var self = this;
        var deferred = $q.defer();
        if (this.order) return $q.when(this.order);
        orderResource.create({},function(order){
            self._setOrder(order._id);
            deferred.resolve(self.order);
        },function(err){deferred.reject(err);});
        return deferred.promise;
    };

    orderDataModel.getOrder = function(){
        return this.order;
    };

    orderDataModel.clear = function(){
        this.order =null;
        localStorage.removeItem("orderId");
    };

    orderDataModel.initialize();
    return orderDataModel;
}
app.factory("OrderDataModel",OrderDataModelFactory);

app.factory('OrderResource', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/orders/:orderId', {id : '@_id'},
        {
            'create': { method: 'POST'},
            "getAll": {method:"GET",isArray:true}
        });
} ]);

export=app;
