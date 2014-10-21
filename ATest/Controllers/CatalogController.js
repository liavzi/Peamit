((function () {
    var app = angular.module("AngularTest");
    app.controller('CatalogController', ['$scope', 'ProductResource', function ($scope, productResource) {
        $scope.products  =  productResource.getAll();
    } ]);
})())