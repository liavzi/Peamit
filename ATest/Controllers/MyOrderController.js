((function () {
    var app = angular.module("AngularTest");

    app.service("OrderDataModel",function(){
        this.getOrCreateOrderId = function(){
            return localStorage.getItem("orderId");
        };
    });

    app.controller('MyOrderController', ['$scope', 'OrderResource',"CloseOrderByPhoneResource","OrderDataModel", function ($scope, orderResource,closeOrderByPhoneResource,orderDataModel) {
        $scope.orderModel = {};
        $scope.orderModel.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
        $scope.closeOrderByPhone = function (){
            closeOrderByPhoneResource.closeOrderByPhone({orderId:orderDataModel.getOrCreateOrderId()},$scope.orderModel.order.customerDetails);
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