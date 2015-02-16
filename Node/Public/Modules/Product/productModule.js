(function(){
    var app = angular.module("Product",[]);

    //Controllers
    app.controller('CatalogController', ['$scope', 'ProductForSellingResource',"TagResource", function ($scope, productForSellingResource,tagResource) {
        $scope.occasionTags = tagResource.getAll({type:"occasion"});
        $scope.groupTags = tagResource.getAll({type:"group"});
    } ]);

    app.controller('ProductByTagController', ['$scope',"ProductByTagDataModel","ProductForSellingResource", function ($scope,productByTagDataModel,productForSellingResource){
        $scope.products = productForSellingResource.getAll({tagId : productByTagDataModel.chosenTag._id});
    } ]);

    app.controller('ProductMaintenanceController', ['$scope',"$routeParams",'ProductResource',function ($scope,$routeParams,productResource) {
        if ($routeParams.productId)
            $scope.product = productResource.getById({id:$routeParams.productId});
        else
            $scope.product = {};
        $scope.product.prices = [];
        $scope.product.prices.push({});
        $scope.AddProduct = function() {
            productResource.put({},$scope.product);
        };
    }]);

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
            $location.path("/ProductMaintenance/"+tag._id);
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

    app.controller('TagMaintenanceController', ['$scope',"$sce","$routeParams",'TagResource',"ProductResource",function ($scope,$routeParams,tagResource,productResource) {
        this.products = productResource.getAll();
        if ($routeParams.tag)
            $scope.tag = tagResource.getById({id:$routeParams.tagId});
        else
            $scope.tag = {};
        this.addTag = function() {
            tagResource.put({},$scope.tag);
        };
        this.trustAsHtml = function(value) {
            return $sce.trustAsHtml(value);
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
                    productByTagDataModel.chosenTag = $scope.tag;
                    $location.path("/ProductsByTag");
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
                "getAll": {mehod:"GET",isArray:true},
                "getById" : {method : "GET"}
            });
    } ]);

})();