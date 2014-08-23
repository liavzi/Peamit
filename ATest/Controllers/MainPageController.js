(function () {
    var app = angular.module('AngularTest');
    app.controller('MainPageController', ['$scope', function ($scope) {
        $scope.pageClass = 'page-MainPage';
    }]);
})();