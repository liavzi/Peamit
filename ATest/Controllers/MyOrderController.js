((function () {
    var app = angular.module("AngularTest");
    app.controller('MyOrderController', ['$scope', 'OrderResource', function ($scope, orderResource) {
        $scope.order  =  orderResource.get({orderId:localStorage.getItem("orderId")});
    } ]);
})());