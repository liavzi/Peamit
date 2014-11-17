var express = require("express");
var addItemToOrderService = require("../services/addItemToOrderService");
var addItemToOrderRouter = express.Router();
addItemToOrderRouter.route("/orders/:orderId/items")
    .post(function(req,res,next){
        var request = {};
        request.orderId = req.params.orderId;
        request.saleInfo = req.body;
        addItemToOrderService.addItemToOrder(request,function(err,result){
            if (err)
                next(err);
            else
            {
                res.json(result);
                res.end();
            }
        })
    });

module.exports = addItemToOrderRouter;