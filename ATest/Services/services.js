(function() {
    var app = angular.module('AngularTest');
    app.factory('ProductResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/products/:id', {id : '@_id'},
       {
           'put': { method: 'PUT' },
           'getAll': { method: 'GET',isArray:true}
       });
    } ]);
})();