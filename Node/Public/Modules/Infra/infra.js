define(["angular","ngResource"],function(){
    var app = angular.module("infra",["ngResource"]);
    app.factory("PeamitReasoruce",["$resource",function($resource){
        return function(path){
            return $resource("'http://localhost:8080/api/"+path+"/:id",{id:"@_id"},{
                'put': { method: 'PUT' },
                'getAll': { method: 'GET',isArray:true},
                "getById" : {method : "GET"}
            });
        };
    }]);
});