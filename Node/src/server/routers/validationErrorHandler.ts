///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../src/schemas/exceptions/IValidationException" />
import express = require("express");

var validationErrorHandler = function(err:any,req,res : express.Response,next :Function){
    if (err instanceof IValidationException)
    {
        return res.json(400,err);
    }
    next(err);
};

export =validationErrorHandler;

