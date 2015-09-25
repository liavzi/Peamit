define(["./order-module"],function(){
    var module = angular.module("order");
    module.directive("hyOrder",function(){
        return {
            restrict : "EA",
            scope : {
                order : "="
            },
            templateUrl : "/Views/Order.html",
            link : function(scope,elem){
                scope.orderModel = {
                    order : scope.order
                }
            }
        };
    });
});