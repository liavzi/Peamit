(function() {
    var app = angular.module('AngularTest');
    app.factory('ProductMaintenance', ['$resource', function ($resource) {
        return $resource('http://localhost/Peamit/products/:id', {id : '@id'},
       {
           'update': { method: 'PUT' }
       });
    } ]);
})();