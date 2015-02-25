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
        };
    } ]);

    app.controller("ProductSoldModalController",["$scope","$modalInstance","$location","soldProduct",function ($scope, $modalInstance,$location,soldProduct){
        $scope.soldProduct = soldProduct;
        $scope.pay = function(){
            $modalInstance.close();
            $location.path("/MyOrder");
        };
    }]);

    //Directives
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
                        }
                    });
                    scope.product.quantity = 0;

                };
            },
            windowClass  : "center-modal"
        };
    }]);


    function Order(orderId,addItemToCartResource){
        this.id = orderId;
        this._addItemToCartResource = addItemToCartResource;
    }

    Order.prototype.addItem = function(saleInfo){
        return this._addItemToCartResource.add({orderId : this.id},saleInfo).$promise;
    };

    //Services
    OrderDataModelFactory.$inject = ["OrderResource","$q","AddItemToCartResource"];
    function OrderDataModelFactory(orderResource,$q,addItemToCartResource){
        var orderDataModel = {};
        orderDataModel.initialize = function(){
            var orderIdFromLocalStorage = localStorage.getItem("orderId");
            if (orderIdFromLocalStorage)
                this._setOrder(orderIdFromLocalStorage)
        };
        orderDataModel._setOrder = function(orderId){
            this.order = new Order(orderId,addItemToCartResource);
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
                'create': { method: 'POST'}
            });
    } ]);

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