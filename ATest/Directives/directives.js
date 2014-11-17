(function() {
    var app = angular.module('AngularTest');
    app.directive("productForSelling",["$modal",function($modal){
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