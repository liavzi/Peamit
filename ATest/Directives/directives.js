(function() {
    var app = angular.module('AngularTest');
    app.directive("productForSelling",function(){
        return {
            restrict : "EA",
            scope : {
                product : "="
            },
            templateUrl : "Views/productForSelling.html"
        };
    });

})();