(function() {
    var app = angular.module('AngularTest');
    app.directive("productForSelling",["$modal","AddItemToCartService",function($modal,addItemToCartService){
        return {
            restrict : "EA",
            scope : {
                product : "="
            },
            templateUrl : "Views/productForSelling.html",
            controller : function($scope){
                $scope.product.quantity = 0;
            },
            link : function(scope){
                scope.addToCart = function(){
                    addItemToCartService.addItemToCart({productId:scope.product._id,quantity:scope.product.quantity});
                    $modal.open({
                        templateUrl:"Views/ProductSoldModal.html",
                        size:"lg"
                    });
                };
            },
            windowClass  : "center-modal"
        };
    }]);

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

})();