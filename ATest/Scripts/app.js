(function () {
    var app = angular.module('AngularTest', ['ui.bootstrap', 'ngRoute', 'ngAnimate','ngResource']);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'Views/MainPage.html',
                controller : 'MainPageController'
            }).
            when('/ProductMaintenance', {
                templateUrl: 'Views/ProductMaintenance.html',
                controller: 'ProductMaintenanceController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
} ())