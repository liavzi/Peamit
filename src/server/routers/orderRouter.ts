///<reference path="../../../typings/tsd.d.ts" />

var addItemToOrderRouter = require("./addItemToOrderRouter");
var orderLinesRouter = require("./orderLinesRouter");
var closeOrderByPhoneRouter = require("./closeOrderByPhoneRouter");
import express = require("express");

var orderRouter = express.Router();
orderRouter.get("/",function(req:any,res,next){
	res.json(req.order);
	res.end();
});
orderRouter.use(addItemToOrderRouter);
orderRouter.use(orderLinesRouter);
orderRouter.use(closeOrderByPhoneRouter);

export = orderRouter;


