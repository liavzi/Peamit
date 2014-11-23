((function () {
    var app = angular.module("AngularTest");
    app.controller('MyOrderController', ['$scope', 'OrderResource', function ($scope, orderResource) {
        $scope.orderModel = {};
        $scope.orderModel.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
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