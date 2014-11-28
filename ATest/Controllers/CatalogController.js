((function () {
    var app = angular.module("AngularTest");
    app.controller('CatalogController', ['$scope', 'ProductForSellingResource',"TagResource", function ($scope, productForSellingResource,tagResource) {
        $scope.occasionTags = tagResource.getAll({type:"occasion"});
        $scope.groupTags = tagResource.getAll({type:"group"});
    } ]);

    app.controller('TagController', ['$scope',"$location","ProductByTagDataModel", function ($scope,$location,productByTagDataModel) {
        $scope.chooseTag = function(){
            productByTagDataModel.chosenTag = $scope.tag;
            $location.path("/ProductsByTag");
        };
    } ]);

    function ProductByTagDataModel(){
    }

    app.service("ProductByTagDataModel",ProductByTagDataModel);

    app.controller('ProductByTagController', ['$scope',"ProductByTagDataModel","ProductForSellingResource", function ($scope,productByTagDataModel,productForSellingResource){
        productForSellingResource.getAll(function(allProducts){
            $scope.products = _.filter(allProducts,function(product){
                return _.some(productByTagDataModel.chosenTag.productIds,function(productId){
                    return product._id === productId;
                });
            });
        });
    } ]);
})());