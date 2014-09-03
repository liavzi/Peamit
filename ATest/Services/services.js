(function() {
    var app = angular.module('AngularTest');
    app.factory('ProductMaintenance', ['$resource', function ($resource) {
        return $resource('http://localhost/Peamit/api/products/:id', {id : '@id'},
       {
           'update': { method: 'PUT' }
       });
    } ]);
})();