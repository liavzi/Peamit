(function() {
    var app = angular.module('AngularTest');

    app.controller("ProductSoldModalController",["$scope","$modalInstance","$location","soldProduct",function ($scope, $modalInstance,$location,soldProduct){
        $scope.soldProduct = soldProduct;
        $scope.pay = function(){
            $modalInstance.close();
            $location.path("/MyOrder");
        };
    }]);

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
                    var itemSoldPromise = addItemToCartService.addItemToCart({productId:scope.product._id,quantity:scope.product.quantity});
                    var modalInstance = $modal.open({
                        templateUrl:"Views/ProductSoldModal.html",
                        size:"lg",
                        controller : "ProductSoldModalController",
                        resolve : {
                            itemSold : function(){return itemSoldPromise;},
                            soldProduct : function(){return angular.copy(scope.product);}
                        }
                    });
                    scope.product.quantity = 0;

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