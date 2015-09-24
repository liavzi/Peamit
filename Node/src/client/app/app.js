require.config(requireConfig);
require(["angular","ui.bootstrap","angular-route","ngResource","../product/product-module"
    ,"../utils/utils-module"
    ,"../order/order-module"
    ,"../order/order-directive"
    ,"jQuery","underscore","toastr"
    ,"../infra/infra-module","ngAnimate"],function () {
    var app = angular.module('Peamit', ['ui.bootstrap', 'ngRoute','ngResource',"order","product","infra","ngAnimate"]);
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