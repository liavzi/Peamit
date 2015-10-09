///<reference path="../../../typings/tsd.d.ts" />
import express = require("express");
import ValidationError = require("../errors/ValidationError");

var validationErrorHandler = function(err:any,req,res : express.Response,next :Function){
    if (err instanceof ValidationError)
    {
        return res.json(400,err);
    }
    next(err);
    var x= 4;
};

export =validationErrorHandler;

