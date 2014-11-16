(function() {
    var app = angular.module('AngularTest');
    app.directive("productForSelling",["$modal",function($modal){
        return {
            restrict : "EA",
            scope : {
                product : "=",
                addToCart : function(){}
            },
            templateUrl : "Views/productForSelling.html",
            controller : function($scope){
                $scope.product.quantity = 0;
            }
        };
    }]);

})();