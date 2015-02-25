require.config(requireConfig);
require(["angular","ui.bootstrap","angular-route","ngResource","../Modules/Product/productModule","../Modules/Utils/utilsModule.js","jQuery","underscore","../Modules/Infra/infraModule"],function () {
    var app = angular.module('PeamitManagement', ['ui.bootstrap', 'ngRoute','ngResource',"Product","Utils","infra"]);
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
            });
    }]);

    $(function(){
        angular.bootstrap(document, ['PeamitManagement']);
    });
} );
