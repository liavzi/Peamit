((function () {
    var app = angular.module("AngularTest");
    app.controller('CatalogController', ['$scope', 'ProductForSellingResource',"TagResource", function ($scope, productForSellingResource,tagResource) {
        $scope.occasionTags = tagResource.getAll({type:"occasion"});
        $scope.groupTags = tagResource.getAll({type:"group"});
    } ]);



    app.service("ProductByTagDataModel",function ProductByTagDataModel(){ });

    app.controller('ProductByTagController', ['$scope',"ProductByTagDataModel","ProductForSellingResource", function ($scope,productByTagDataModel,productForSellingResource){
        $scope.products = productForSellingResource.getAll({tagId : productByTagDataModel.chosenTag._id});
    } ]);
})());