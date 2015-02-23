define(["angular","selectize"],function(){
    var app= angular.module("Utils",[]);
    app.directive("peamitSelect",[function(){
        function initializeSelectize(elem,scope) {
            var options = {
                valueField : "_id",
                labelField : scope.searchedProperty,
                searchField : scope.searchedProperty
            };
            var selectize = elem.selectize(options)[0].selectize;
            elem.data("selectizeIntialized", true);
            return selectize;
        }

        function updateSelectizeOptions(selectize,options){
            selectize.clearOptions();
            selectize.addOption(options);
        };

        return {
            restrict : "E",
            replace : true,
            template : "<input type=\"text\">",
            scope : {
                source : "=",
                selected : "=",
                searchedProperty : "@"
            } ,
            link : function(scope,elem){
                var selectize = initializeSelectize(elem,scope);
                updateSelectizeOptions(selectize,scope.source);
                scope.$watch("source",function(source){
                    updateSelectizeOptions(selectize,source);
                },true);
                selectize.on("change",function(value){
                    scope.$apply(function(){scope.selected = selectize.items;});
                });
                scope.$watch("selected",function(selected){
                    if (!selected || selected.length==0) return;
                    if (angular.equals(selected,selectize.items,true)) return;
                    selectize.clear();
                    selected.forEach(function(x){
                        selectize.addItem(x,true);
                    });
                },true);
            }
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
    }

    app.service("alertService",AlertService);

    app.controller("alertsController",["alertService",function(alertService){
        this.alerts = alertService.alerts;
    }]);






});