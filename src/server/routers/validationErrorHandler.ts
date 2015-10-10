///<reference path="../../../typings/tsd.d.ts" />
import express = require("express");

var validationErrorHandler = function(err:any,req,res : express.Response,next :Function){
    if (err instanceof Error && (<Error>err).name ==="ValidationError")
    {      
        return res.json(400,err);
    }
    next(err);
};

export =validationErrorHandler;
