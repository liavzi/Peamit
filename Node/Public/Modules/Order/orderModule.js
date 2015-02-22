define(["angular"],function(){
    var app = angular.module("Order",[]);

    //Controllers
    app.controller('MyOrderController', ['$scope', 'OrderResource',"CloseOrderByPhoneResource","OrderDataModel", function ($scope, orderResource,closeOrderByPhoneResource,orderDataModel) {
        $scope.orderModel = {};
        $scope.orderModel.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
        $scope.closeOrderByPhone = function (){
            closeOrderByPhoneResource.closeOrderByPhone({orderId:$scope.orderModel.order._id},$scope.orderModel.order.customerDetails,function(){
                orderDataModel.clear();
            });
        };
    } ]);

    app.controller('OrderLineController', ['$scope', 'ProductResource',"OrderLinesResource", function ($scope, productResource,orderLinesResource) {
        $scope.product = productResource.getById({id:$scope.orderLine.productId});
        $scope.removeOrderLine = function(){
            orderLinesResource.delete({orderId:$scope.orderModel.order._id,orderLineId : $scope.orderLine._id},{},function(order){
                $scope.orderModel.order = order;
            });
        }
    } ]);

    app.controller("ProductSoldModalController",["$scope","$modalInstance","$location","soldProduct",function ($scope, $modalInstance,$location,soldProduct){
        $scope.soldProduct = soldProduct;
        $scope.pay = function(){
            $modalInstance.close();
            $location.path("/MyOrder");
        };
    }]);

    //Directives
    app.directive("productForSelling",["$modal","AddItemToCartService",function($modal,addItemToCartService){
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
                    var itemSoldPromise = addItemToCartService.addItemToCart({productId:scope.product._id,quantity:scope.product.quantity});
                    var modalInstance = $modal.open({
                        templateUrl:"Views/ProductSoldModal.html",
                        size:"lg",
                        controller : "ProductSoldModalController",
                        resolve : {
                            itemSold : function(){return itemSoldPromise;},
                            soldProduct : function(){return angular.copy(scope.product);}
                        }
                    });
                    scope.product.quantity = 0;

                };
            },
            windowClass  : "center-modal"
        };
    }]);

    //Services
    function OrderDataModel(orderResource,$q){
        this._orderResource = orderResource;
        this._$q = $q
    }

    OrderDataModel.prototype._setOrderId = function(orderId){
        this._orderId = orderId;
        localStorage.setItem("orderId",orderId);
    };

    OrderDataModel.prototype.getOrCreateOrderId = function(){
        var self = this;
        var deferred = self._$q.defer();
        if (this._orderId) return this._$q.when(this._orderId);
        var orderIdFromLocalStorage = localStorage.getItem("orderId");
        if (orderIdFromLocalStorage)
        {
            this._orderId = orderIdFromLocalStorage;
            return this._$q.when(this.orderId);
        }
        this._orderResource.create({},function(order){
            self._setOrderId(order._id);
            deferred.resolve(order._id);
        },function(err){deferred.reject(err)});

        return deferred.promise;
    };

    OrderDataModel.prototype.clear = function(){
        this._orderId =null;
        localStorage.removeItem("orderId");
    };

    app.service("OrderDataModel",["OrderResource","$q",OrderDataModel]);

    app.factory('OrderResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId', {id : '@_id'},
            {
                'create': { method: 'POST'}
            });
    } ]);

    function AddItemToCartService($q,addItemToCartResource,orderDataModel){
        this._addItemToCartResource = addItemToCartResource;
        this._orderDataModel = orderDataModel;
        this.$q = $q;
    }

    AddItemToCartService.prototype._addItemToOrder = function(orderId,saleInfo){
        return this._addItemToCartResource.add({orderId : orderId},saleInfo).$promise;
    };

    AddItemToCartService.prototype.addItemToCart = function(saleInfo){
        var deferred = this.$q.defer();
        var self = this;
        this._orderDataModel.getOrCreateOrderId()
            .then(function(orderId){self._addItemToOrder(orderId,saleInfo)})
            .then(function(value){deferred.resolve(value)});
        return deferred.promise;
    };

    app.service('AddItemToCartService', ["$q",'AddItemToCartResource',"OrderDataModel",AddItemToCartService]);

    app.factory('AddItemToCartResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId/items',{},
            {
                'add': { method: 'POST'}
            });
    } ]);

    app.factory('OrderLinesResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId/lines/:orderLineId', {},
            {
            });
    } ]);

    app.factory('CloseOrderByPhoneResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId/actions/closeOrderByPhone', {},
            {
                closeOrderByPhone : {method : "POST"}
            });
    } ]);

});