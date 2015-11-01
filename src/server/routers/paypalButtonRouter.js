///<reference path="../../../typings/tsd.d.ts" />
var express = require("express");
var request = require("request");
var querystring = require("querystring");
var paypalButtonRouter = express.Router();
paypalButtonRouter.get("/paypalButton", function (req, res, next) {
    request.post({
        url: "https://api-3t.sandbox.paypal.com/nvp",
        form: {
            USER: "hermeny.one.time-facilitator_api1.gmail.com",
            PWD: "UCR8LUJ9PM9TVJCQ",
            SIGNATURE: "AFcWxV21C7fd0v3bYYYRCpSSRl31A4EARGvq3nRJnENEMMv1Xa0yzasr",
            VERSION: 124,
            METHOD: "BMCreateButton",
            BUTTONCODE: "ENCRYPTED",
            BUTTONTYPE: "BUYNOW",
            L_BUTTONVAR1: "item_name=סכום הזמנה",
            L_BUTTONVAR2: "amount=" + req.order.total,
            L_BUTTONVAR3: "currency_code=ILS",
            L_BUTTONVAR4: "cn=הוסף הנחיות מיוחדות למוכר",
            L_BUTTONVAR5: "return=http://www.localhost.com:8080/#/afterPayPalSuccess",
            L_BUTTONVAR6: "cancel_return=http://www.localhost.com:8080/#/afterPayPalCancel",
            L_BUTTONVAR7: "shipping=10.00"
        }
    }, function (err, httpResponse, body) {
        var response = querystring.parse(body);
        res.end(response.WEBSITECODE);
    });
});
module.exports = paypalButtonRouter;
