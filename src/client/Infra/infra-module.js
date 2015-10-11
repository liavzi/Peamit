define(["angular","ngResource","toastr"],function(a,r,toastr){
    var x = 2;
    var app = angular.module("infra",["ngResource"]);
    app.factory("peamitResource",["$resource","alertsService",function($resource,alertsService){
        function addSavedAlert(){
            alertsService.addAlert("נשמר","success");
        }
        function addDeletedAlert(){
            alertsService.addAlert("נמחק","success");
        }
        function addFailedAlert(){
            alertsService.addAlert("נכשל","danger");
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
                innerReource.put(entity).$promise.then(addSavedAlert,addFailedAlert);
            };
            peamitResource.delete = function(id,callback){
                innerReource.delete({id: id}).$promise.then(function(){addDeletedAlert();callback();},addFailedAlert);
            };
            return peamitResource;
        };
    }]);

    var AlertService = function ($timeout) {
        this.alerts = [];
        this.$timeout = $timeout;
    };

    AlertService.$inject = ["$timeout"];

    AlertService.prototype.addAlert = function (message,alertType){
        var self = this;
        this.alerts.push({message:message,type:alertType});

        if (this.timeoutPromise){
            this.$timeout.cancel(this.timeoutPromise);
        }

        this.timeoutPromise = this.$timeout(function(){
            self.alerts.length = 0;
            self.timeoutPromise = undefined;
        },3000);
    };

    app.service("alertsService",AlertService);

    app.controller("alertsController",["alertsService",function(alertService){
        this.alerts = alertService.alerts;
    }]);

    function toastrService(){
    }
    toastrService.prototype.success = function(message){
        toastr.success(message);
    }

    app.service("toastr",toastrService);
});