///<reference path="../../../typings/tsd.d.ts"/>
import angular = require("angular");
import toastr = require("toastr");
import ui = require("angular-bootstrap");
import IValidationError = require("../../schemas/errors/IValidationError");


export var app = angular.module("infra",["ngResource"]);
app.config(["$httpProvider",($httpProvider : ng.IHttpProvider)=>{
    $httpProvider.interceptors.push("validationErrorInterceptorFactory");
}])

function validationErrorInterceptorFactory(toastr : Toastr) : ng.IHttpInterceptor{   
    function formatError(err : IValidationError) : string{
        var msgs = [];
        Object.keys(err.errors).forEach(function(key) {
            if (this == this.errors[key]) return;
            msgs.push(String(this.errors[key].message));
        }, err); 
        return msgs.join(String.fromCharCode(13,10));
    } 
    return {
        responseError : function(response){
            if (response.status && response.status===400){
                var error : IValidationError= response.data;
                toastr.error(formatError(error));
            }
        }

    };
}
validationErrorInterceptorFactory.$inject = ["toastr"];
app.factory("validationErrorInterceptorFactory",validationErrorInterceptorFactory)

app.factory("peamitResource",["$resource","toastr",function($resource,toastr :Toaster){
    function addSavedAlert(){
        toastr.success("נשמר");
    }
    function addDeletedAlert(){
        toastr.success("נמחק");
    }
    function addFailedAlert(){
        toastr.error("נכשל");
    }
    return function(path){
        var innerReource =  $resource("/api/"+path+"/:id",{id:"@_id"},{
            'post' : {method : "POST"},
            'put': { method: 'PUT' },
            'getAll': { method: 'GET',isArray:true},
            "getById" : {method : "GET"}
        });
        var peamitResource  = Object.create(innerReource);
        peamitResource.put = function(entity){
            return innerReource.put(entity).$promise.then(addSavedAlert,addFailedAlert);
        };
        peamitResource.delete = function(id){
            return innerReource.delete({id: id}).$promise.then(addDeletedAlert,addFailedAlert);
        };
        return peamitResource;
    };
}]);


export class Toaster{
    success(message:string){
        toastr.success(message);
    }
    error(message:string){
        toastr.error(message);
    }
}

app.service("toastr",Toaster);