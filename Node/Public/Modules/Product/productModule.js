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

    app.controller('ProductMaintenanceController', ['$scope', 'ProductResource', function ($scope, productResource) {
        $scope.product = {};
        $scope.product.prices = [];
        $scope.product.prices.push({});
        $scope.AddProduct = function() {
            productResource.put({},$scope.product);
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
        return $resource('http://localhost:8080/api/tags/:tagId', {tagId : '@_id'},
            {
                "getAll": {mehod:"GET",isArray:true}
            });
    } ]);

})();