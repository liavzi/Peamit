define(["./order-module"],function(){
    var module = angular.module("order");
    module.directive("hyOrder",function(){
        return {
            restrict : "EA",
            scope : {
                orderModel : "="
            },
            templateUrl : "/Views/Order.html",
            link : function(scope,elem){
            }
        };
    });
});