///<reference path="../../../typings/tsd.d.ts" />
import orderShcema = require("../schemas/orderSchema");
var express = require("express");
var router = express.Router();
router.route("/closeAsSelfPickup")
    .post(function(req,res,next){
        let order : orderShcema.IOrder= req.order;
        order.closeAsSelfPickup(req.body,(err)=>{
            if (err) return next(err);
            order.save((err,order)=>{
                if (err) return next(err);
                res.json(order).end();  
            }); 
        })
    });

module.exports = router;