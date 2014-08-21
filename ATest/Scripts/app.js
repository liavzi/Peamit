(function () {
    var app = angular.module('AngularTest', ['ui.bootstrap','ngRoute']);
    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'Views/MainPage.html',
            }).
            when('/ProductMaintenance', {
                templateUrl: 'Views/ProductMaintenance.html',
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
} ())