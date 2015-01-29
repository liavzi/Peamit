(function () {
    var app = angular.module('PeamitManagement', ['ui.bootstrap', 'ngRoute', 'ngAnimate','ngResource',"Product"]);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/ProductMaintenance', {
                templateUrl: '/ManagementViews/AddProduct.html',
                controller : "ProductMaintenanceController"
            })
    }]);
} ());