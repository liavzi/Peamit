var express = require("express");
var addItemToOrderService = require("../services/addItemToOrderService");
var addItemToOrderRouter = express.Router();
import orderFactory = require("../businessComponents/orderFactory");
addItemToOrderRouter.route("/items")
    .post(function(req,res,next){
        var request :any = {};
        request.saleInfo = req.body;
        request.order = req.order;
        if (!request.order){
            return orderFactory.createNewOrder((err,newOrder)=>{
                if (err) return next(err);
                req.session.orderId = newOrder._id;
                request.order = newOrder;
                addItemToOrder(request,req,res,next);                   
            });
		}
        addItemToOrder(request,req,res,next);              
        function addItemToOrder(request,req,res,next){
            addItemToOrderService.addItemToOrder(request,function(err,result){
                if (err) return next(err);   
                res.json(result);
                res.end();
            });
        }
    });

module.exports = addItemToOrderRouter;