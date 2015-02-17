(function () {
    var app = angular.module('PeamitManagement', ['ui.bootstrap', 'ngRoute', 'ngAnimate','ngResource',"Product","Utils"]);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/ProductsView', {
                templateUrl: '/ManagementViews/ProductsView.html',
                controller : "ProductsViewController",
                controllerAs : "productViewController"
            }).
            when("/ProductMaintenance/:productId?",{
                templateUrl: '/ManagementViews/ProductMaintenance.html',
                controller: 'ProductMaintenanceController'
            }).
            when('/TagsView', {
                templateUrl: '/ManagementViews/TagsView.html'
            }).
            when("/TagMaintenance/:tagId?",{
                templateUrl: '/ManagementViews/TagMaintenance.html'
            });
    }]);
} ());