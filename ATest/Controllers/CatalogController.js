((function () {
    var app = angular.module("AngularTest");
    app.controller('CatalogController', ['$scope', 'ProductForSellingResource', function ($scope, productForSellingResource) {
        $scope.products  =  productForSellingResource.getAll();
    } ]);
})())