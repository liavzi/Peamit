///<reference path="../../../typings/tsd.d.ts" />
import express = require("express");
import R = require("./registerRouters");
import request = require("request");
import querystring = require("querystring");
let paypalButtonRouter  = express.Router();
paypalButtonRouter.get("/paypalButton",(req : R.OrderActionRequest,res :express.Response,next)=>{
	request.post({
		url: "https://api-3t.sandbox.paypal.com/nvp",
		form : {
			USER : "hermeny.one.time-facilitator_api1.gmail.com",
			PWD : "UCR8LUJ9PM9TVJCQ",
			SIGNATURE : "AFcWxV21C7fd0v3bYYYRCpSSRl31A4EARGvq3nRJnENEMMv1Xa0yzasr",
			VERSION : 124,
			METOD : "BMCreateButton",
			BUTTONCODE : "ENCRYPTED",
			BUTTONTYPE : "BUYNOW"
		}	
	},function(err,httpResponse,body){
		let response = querystring.parse(body);
		res.end(response.WEBSITECODE);
	});
});
export = paypalButtonRouter;