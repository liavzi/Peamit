///<reference path="../../../typings/tsd.d.ts" />
import ClubRegistration = require("../models/ClubRegistration");
import express = require("express");
let  clubRegistrationRouter = express.Router();
import  users = require("../businessComponents/users");
clubRegistrationRouter.route("/club-registration")
	.get(users.ensureAdmin,function(req,res,next){
		ClubRegistration.find({},(err,requests)=>{
			if (err) return next(err);
			res.json(requests).end();
		});
	})
	.post(function(req,res,next){
        ClubRegistration.create(req.body,(err,request)=>{
           if (err) return next(err);
           res.json(request).end(); 
        });
    });

clubRegistrationRouter.route("/club-registration/:id")
    .delete(users.ensureAdmin,function(req,res,next){
        ClubRegistration.findByIdAndRemove(req.params.id,(err,request)=>{
           if (err) return next(err);
           res.json(request).end(); 
        });
    });




export = clubRegistrationRouter;