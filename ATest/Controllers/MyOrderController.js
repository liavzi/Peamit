((function () {
    var app = angular.module("AngularTest");

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

    app.service("OrderDataModel",["OrderResource","$q",OrderDataModel]);

    app.controller('MyOrderController', ['$scope', 'OrderResource',"CloseOrderByPhoneResource","OrderDataModel", function ($scope, orderResource,closeOrderByPhoneResource,orderDataModel) {
        $scope.orderModel = {};
        $scope.orderModel.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
        $scope.closeOrderByPhone = function (){
            closeOrderByPhoneResource.closeOrderByPhone({orderId:orderDataModel.getOrCreateOrderId()},$scope.orderModel.order.customerDetails,function(){
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
})());