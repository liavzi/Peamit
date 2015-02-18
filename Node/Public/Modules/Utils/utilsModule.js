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
                scope.$watch("source",function(source){
                    if (elem.data("select2")) elem.select2("destroy");
                    var data =[];
                    source.forEach(function(x){
                       data.push({id: x._id,text: x[scope.searchedProperty]});
                    });
                    var options = {
                        data :  data
                    };
                    elem.select2(options);
                    elem.on("select2:select",function(){
                        scope.$apply(function(){scope.selected = elem.val();});
                    });
                },true);
            }
        };
    }]);
})();