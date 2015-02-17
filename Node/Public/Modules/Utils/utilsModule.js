(function(){
    var app= angular.module("Utils",[]);
    app.directive("peamitSelect",[function(){
        return {
            restrict : "E",
            replace : true,
            template : "<select></select>",
            scope : {
                source : "=",
                selected : "=",
                searchedProperty : "@"
            },
            link : function(scope,elem){
                scope.$watch(function(){return scope.source;},function(source){
                    if (elem.data("select2")) elem.select2("destroy");
                    var data = _.map(source,function(x){var y=x;y.text = x[scope.searchedProperty];return y});
                    var options = {
                        data :  source
                    };
                    elem.select2(options);
                    elem.on("select2:select",function(){
                        scope.$apply(function(){scope.selected = elem.val();});
                    });
                });
            }
        };
    }]);
})();