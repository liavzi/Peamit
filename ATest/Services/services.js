﻿(function() {
    var app = angular.module('AngularTest');
    app.factory('ProductResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/products/:id', {id : '@_id'},
       {
           'put': { method: 'PUT' },
           'getAll': { method: 'GET',isArray:true},
           "getById" : {method : "GET"}
       });
    } ]);
    app.factory('ProductForSellingResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/productForSelling/:id', {id : '@_id'},
            {
                'getAll': { method: 'GET',isArray:true}
            });
    } ]);
    app.factory('OrderResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId', {id : '@_id'},
            {
                'create': { method: 'POST'}
            });
    } ]);

    function AddItemToCartService($q,addItemToCartResource,orderResource){
        this._addItemToCartResource = addItemToCartResource;
        this._orderResource = orderResource;
        this.$q = $q;
    }

    AddItemToCartService.prototype._addItemToOrder = function(orderId,saleInfo){
        return this._addItemToCartResource.add({orderId : orderId},saleInfo).$promise;
    };

    AddItemToCartService.prototype.addItemToCart = function(saleInfo){
        var deferred = this.$q.defer();
        var orderId = localStorage.getItem("orderId");
        var self = this;
        if (!orderId){
            this._orderResource.create({},function(order){
                localStorage.setItem("orderId",order._id);
                self._addItemToOrder(order._id,saleInfo).then(function(value){
                    deferred.resolve(value)});
            });
        }
        else{
            self._addItemToOrder(orderId,saleInfo).then(function(value){
                deferred.resolve(value)});
        }
        return deferred.promise;
    };

    app.factory('AddItemToCartResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId/items',{},
            {
                'add': { method: 'POST'}
            });
    } ]);
    app.service('AddItemToCartService', ["$q",'AddItemToCartResource',"OrderResource",AddItemToCartService]);

    app.factory('OrderLinesResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/orders/:orderId/lines/:orderLineId', {id : '@_id'},
            {
            });
    } ]);

    app.factory('TagResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/tags/:tagId', {tagId : '@_id'},
            {
                "getAll": {mehod:"GET",isArray:true}
            });
    } ]);
})();