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

})();