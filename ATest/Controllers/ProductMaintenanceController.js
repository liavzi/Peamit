((function() {
    var app = angular.module("AngularTest");
    app.controller('ProductMaintenanceController', ['$scope', 'ProductResource', function ($scope, productResource) {
        $scope.product = {};
        $scope.AddProduct = function() {
            productResource.put({},$scope.product);
        };
    }]);
})())