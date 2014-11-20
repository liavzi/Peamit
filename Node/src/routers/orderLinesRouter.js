var express = require("express");
var addItemToOrderService = require("../services/orderLinesService");
var orderLinesRouter = express.Router();
orderLinesRouter.route("/orders/:orderId/lines/:orderLineId")
    .delete(function(req,res,next){
        var request = {};
        request.orderId = req.params.orderId;
        request.orderLineId = req.orderLineId;
        addItemToOrderService.removeLineFromOrder(request,function(err,order){
            if (err) return next(err);
            res.json(order);
            res.end();
        });
    });

module.exports = orderLinesRouter;