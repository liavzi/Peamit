define(["angular"],function(){
    var app = angular.module("Product",[]);

    //Controllers
    app.controller('CatalogController', ['$scope', 'ProductForSellingResource',"TagResource", function ($scope, productForSellingResource,tagResource) {
        $scope.occasionTags = tagResource.getAll({type:"occasion"});
        $scope.groupTags = tagResource.getAll({type:"group"});
    } ]);

    app.controller('ProductByTagController', ['$scope',"$routeParams","ProductForSellingResource", function ($scope,$routeParams,productForSellingResource){
        $scope.products = productForSellingResource.getAll({tagId : $routeParams.tagId});
    } ]);

    app.controller('ProductMaintenanceController', ['$scope',"$routeParams",'ProductResource',function ($scope,$routeParams,productResource) {
        if ($routeParams.productId){
            $scope.product = productResource.getById({id:$routeParams.productId});
            $scope.product.$promise.then(function(product){
                initializePrices($scope.product);
            });
        }
        else {
            $scope.product = { };
            initializePrices($scope.product);
        }
        $scope.AddProduct = function() {
            productResource.put({},$scope.product);
        };
    }]);

    function initializePrices(product){
        if (!product.prices){
            product.prices = [];
            product.prices.push({});
        }
    }

    app.controller("ProductsViewController",['ProductResource',"$location",function(productResource,$location){
        this.products = productResource.getAll();
        this.editProduct = function (product) {
            $location.path("/ProductMaintenance/"+product._id);
        };
        this.selectProduct = function (product) {
            this.selectedProduct = product;
        };
        this.deleteProduct = function(product){
            var self  = this;
            productResource.delete({id:product._id},function(){
                self.products = productResource.getAll();
            });
        };
    }])

    app.controller("TagsViewController",['TagResource',"$location",function(tagResource,$location){
        this.tags = tagResource.getAll();
        this.editTag = function (tag) {
            $location.path("/TagMaintenance/"+tag._id);
        };
        this.selectTag = function (tag) {
            this.selectedTag = tag;
        };
        this.deleteTag = function(tag){
            var self  = this;
            tagResource.delete({id:tag._id},function(){
                self.tags = tagResource.getAll();
            });
        };
    }]);

    app.controller('TagMaintenanceController', ['$scope',"$routeParams",'TagResource',"ProductResource",function ($scope,$routeParams,tagResource,productResource) {
        var self =this;
        this.products = [];
        productResource.getAll().$promise.then(function(products){
            self.products = products;
        });
        if ($routeParams.tagId)
            this.tag = tagResource.getById({id:$routeParams.tagId});
        else
            this.tag = {};
        this.addTag = function() {
            if (this.tag._id)
                tagResource.put(this.tag);
            else
                tagResource.post(this.tag);
        };
    }]);


    //Directives
    app.directive("productTag",["$location","ProductByTagDataModel",function($location,productByTagDataModel){
        return {
            restrict : "EA",
            scope : {
                tag : "="
            },
            templateUrl : "Views/ProductTag.html",
            link : function ($scope){
                $scope.chooseTag = function(){
                    $location.path("/ProductsByTag/"+$scope.tag._id);
                };
            }
        };
    }]);



    //Services
    app.service("ProductByTagDataModel",function ProductByTagDataModel(){ });

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

    app.factory('TagResource', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api/tags/:id', {id : '@_id'},
            {
                'put': { method: 'PUT' },
                'post': { method: 'POST' },
                "getAll": {mehod:"GET",isArray:true},
                "getById" : {method : "GET"}
            });
    } ]);

});