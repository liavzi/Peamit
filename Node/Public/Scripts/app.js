(function () {
    var app = angular.module('AngularTest', ['ui.bootstrap', 'ngRoute', 'ngAnimate','ngResource',"Order","Product"]);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'Views/MainPage.html'
            }).
            when('/ProductMaintenance', {
                templateUrl: 'Views/ProductMaintenance.html',
                controller: 'ProductMaintenanceController'
            }).           
            when('/Catalog', {
                templateUrl: 'Views/Catalog.html',
                controller: 'CatalogController'
            }).
            when('/ProductsByTag', {
                templateUrl: 'Views/ProductByTag.html',
                controller: 'ProductByTagController'
            }).
            when('/MyOrder', {
                templateUrl: 'Views/MyOrder.html',
                controller: 'MyOrderController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
} ())