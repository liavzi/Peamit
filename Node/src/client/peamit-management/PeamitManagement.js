require.config(requireConfig);
require(["angular","ui.bootstrap"
    ,"angular-route","ngResource"
    ,"../product/productModule"
    ,"../order/orderModule"
    ,"../utils/utilsModule.js"
    ,"jQuery","underscore"
    ,"../infra/infraModule"
    ,"ngAnimate"],function () {
    var app = angular.module('PeamitManagement', ['ui.bootstrap', 'ngRoute','ngResource',"Product","Utils","infra","ngAnimate"
        ,"Order"]);
    app.config(['$routeProvider',function ($routeProvider) {
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
            }).
            when("/ClosedOrders",{
                templateUrl: "/ManagementViews/ClosedOrders.html"
            });
    }]);

    $(function(){
        angular.bootstrap(document, ['PeamitManagement']);
    });
} );
