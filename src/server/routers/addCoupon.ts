///<reference path="../../../typings/tsd.d.ts" />
import express = require("express");
let  addCoupon = express.Router();
import orderFactory = require("../businessComponents/orderFactory");
import R = require("./registerRouters");
import config = require("config");
import BusinessError  = require("../errors/BusinessError");
let couponName= config.get<string>("coupon.name");
let minOrder = config.get("coupon.minOrder");
addCoupon.route("/coupons")
    .post(function(req  : R.OrderActionRequest,res : express.Response,next){
        //TODO : need to be in the order itself!
        let coupon :string = req.body.coupon;
        if (coupon.trim().toLowerCase() !== couponName.trim().toLowerCase()) return next(new BusinessError("קוד קופון אינו תקין"));
        if (req.order.total<minOrder) return next(new BusinessError(`מינימום הזמנה : ${minOrder}`));
        req.order.shipmentFee = 0;
        req.order.save((err,order)=>{
           if (err) return next(err);
           res.json(order).end();
        });
    });

export = addCoupon;