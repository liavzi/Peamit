var express = require("express");
var addItemToOrderService = require("../services/addItemToOrderService");
var addItemToOrderRouter = express.Router();
addItemToOrderRouter.route("/items")
    .post(function(req,res,next){
        var request = {};
        request.order = req.order;
        request.saleInfo = req.body;
        addItemToOrderService.addItemToOrder(request,function(err,result){
            if (err)
                next(err);
            else
            {
                res.json(result);
                res.end();
            }
        });
    });

module.exports = addItemToOrderRouter;