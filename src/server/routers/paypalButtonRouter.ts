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
			METHOD : "BMCreateButton",
			BUTTONCODE : "ENCRYPTED",
			BUTTONTYPE : "BUYNOW",
			L_BUTTONVAR1 : "item_name=סכום הזמנה",
            L_BUTTONVAR2 : `amount=${req.order.total}`,
			L_BUTTONVAR3 : "currency_code=ILS"
			,L_BUTTONVAR4 : "cn=הוסף הנחיות מיוחדות למוכר"
			,L_BUTTONVAR5 : "return=http://www.localhost.com:8080/#/afterPayPalSuccess"
			,L_BUTTONVAR6 : "cancel_return=http://www.localhost.com:8080/#/afterPayPalCancel"
			,L_BUTTONVAR7 : "shipping=10.00"
			,L_BUTTONVAR8 : `custom=${req.order._id}`
		}	
	},function(err,httpResponse,body){
		let response = querystring.parse(body);
		res.end(response.WEBSITECODE);
	});
});
export = paypalButtonRouter;