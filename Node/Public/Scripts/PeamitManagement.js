(function () {
    var app = angular.module('PeamitManagement', ['ui.bootstrap', 'ngRoute', 'ngAnimate','ngResource',"Product"]);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/ProductsView', {
                templateUrl: '/ManagementViews/ProductsView.html',
                controller : "ProductsViewController"
            }).
            when("/ProductMaintenance/:productId",{
                templateUrl: '/ManagementViews/ProductMaintenance.html',
                controller: 'ProductMaintenanceController'
            });
    }]);
} ());