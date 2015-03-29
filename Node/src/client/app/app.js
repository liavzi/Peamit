require.config(requireConfig);
require(["angular","ui.bootstrap","angular-route","ngResource","../product/productModule"
    ,"../utils/utilsModule.js"
    ,"../order/orderModule.js"
    ,"jQuery","underscore"
    ,"../infra/infraModule","ngAnimate"],function () {
    var app = angular.module('Peamit', ['ui.bootstrap', 'ngRoute','ngResource',"Order","Product","infra","ngAnimate"]);
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'Views/MainPage.html'
            }).
            when('/Catalog', {
                templateUrl: 'Views/Catalog.html',
                controller: 'CatalogController'
            }).
            when('/ProductsByTag/:tagId?', {
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

    $(function(){
        angular.bootstrap(document, ['Peamit']);
    });
});