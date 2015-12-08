window.requireConfig={
    paths: {
        'jQuery': '//code.jquery.com/jquery-1.11.2.min',
        'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
        "angular" : "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular",
        "ngResource" :"https://ajax.googleapis.com/ajax/libs/angularjs//1.4.8/angular-resource"
        ,"angular-aria" : "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria"
        ,"angular-material" : "https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0-rc4/angular-material"
        ,"angular-route" : "https://ajax.googleapis.com/ajax/libs/angularjs//1.4.8/angular-route"
        ,"angular-animate" : "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate"
        ,"selectize" : "../ScriptsLibs/selectize"
        ,"ui.bootstrap" : "..//ScriptsLibs/ui-bootstrap-tpls-0.14.3"       
        ,"uiGrid" : "https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min"
        ,"toastr" : "//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr"
        ,"ui.router" : "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router"
        ,"ng-file-upload" :"https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/9.0.19/ng-file-upload"
        ,"blockUI" : "/ScriptsLibs/blockUI/jquery.blockUI"
        ,"ui.select" : "/ScriptsLibs/ui.select/ui.select"
        ,"jquery.ui" : "https://cdn.jsdelivr.net/g/jquery.ui@1.10%28jquery.ui.core.min.js+jquery.ui.widget.min.js+jquery.ui.mouse.min.js+jquery.ui.sortable.min"
        ,"ui.sortable" : "/ScriptsLibs/ui.sortable/ui.sortable"
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        "angular" : {
            exports : "angular",
            deps : ["jQuery"]
        },
        "ngResource" : {
            deps : ["angular"]
        },
        "selectize" : {
            deps : ["jQuery"]
        },
        "ui.bootstrap" : {
            deps : ["angular"]
        },
        "angular-route" : {
            deps : ["angular"]
        },
        "angular-animate" : {
            deps : ["angular"]
        },
        "uiGrid" : {
            deps : ["angular"]
        },
        "toastr" : {
            exports : "toastr",
            deps : ["jQuery"]
        },
        "ui.router" : {
            deps : ["angular"]
        },
        "ng-file-upload" :{
            deps : ["angular"]
        },
        "blockUI" :{
            deps : ["jQuery"]
        },
        "ui.select" :{
            deps : ["angular","jQuery"]
        },
        "jquery.ui" :{
            deps : ["jQuery"]
        },
        "ui.sortable":{
            deps : ["jQuery","angular","jquery.ui"]
        },
        "angular-material":{
            deps : ["angular","angular-aria","angular-animate"]
        },
        "angular-aria":{
            deps : ["angular"]
        },        
    }
};