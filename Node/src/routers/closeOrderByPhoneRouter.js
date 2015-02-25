var express = require("express");
var closeOrderByPhoneService = require("../services/closeOrderByPhoneService");
var closeOrderByPhoneRouter = express.Router();
closeOrderByPhoneRouter.route("/orders/:orderId/actions/closeOrderByPhone")
    .post(function(req,res,next){
        var request = {};
        request.orderId = req.params.orderId;
        request.customerDetails = req.body;
        closeOrderByPhoneService.closeOrderByPhone(request,function(err,result){
            if (err) return next(err);
            res.json(result);
            res.end();

        });
    });

module.exports = closeOrderByPhoneRouter;