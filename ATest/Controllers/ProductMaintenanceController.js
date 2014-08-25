((function() {
    var app = angular.module("AngularTest");
    app.controller('ProductMaintenanceController', ['$scope', 'ProductMaintenance', function ($scope, productMaintenance) {
        $scope.product = {};
        $scope.AddProduct = function() {
            productMaintenance.save({id:null},$scope.product);
        };
    }]);
})())