((function () {
    var app = angular.module("AngularTest");
    app.controller('MyOrderController', ['$scope', 'OrderResource', function ($scope, orderResource) {
        $scope.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
    } ]);

    app.controller('OrderLineController', ['$scope', 'ProductResource', function ($scope, productResource) {
        $scope.product = productResource.getById({id:$scope.orderLine.productId});
    } ]);
})());