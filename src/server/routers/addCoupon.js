///<reference path="../../../typings/tsd.d.ts" />
var express = require("express");
var addCoupon = express.Router();
var config = require("config");
var BusinessError = require("../errors/BusinessError");
var couponName = config.get("coupon.name");
var minOrder = config.get("coupon.minOrder");
addCoupon.route("/coupons")
    .post(function (req, res, next) {
    //TODO : need to be in the order itself!
    var coupon = req.body.coupon;
    if (coupon.trim().toLowerCase() !== couponName.trim().toLowerCase())
        return next(new BusinessError("קוד קופון אינו תקין"));
    if (req.order.total < minOrder)
        return next(new BusinessError("\u05DE\u05D9\u05E0\u05D9\u05DE\u05D5\u05DD \u05D4\u05D6\u05DE\u05E0\u05D4 : " + minOrder));
    req.order.shipmentFee = 0;
    req.order.save(function (err, order) {
        if (err)
            return next(err);
        res.json(order).end();
    });
});
module.exports = addCoupon;
