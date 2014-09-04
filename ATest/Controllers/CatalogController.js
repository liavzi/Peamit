((function () {
    var app = angular.module("AngularTest");
    app.controller('CatalogController', ['$scope', 'ProductMaintenance', function ($scope, productMaintenance) {
        $scope.products = productMaintenance.getAll();
    } ]);
})())