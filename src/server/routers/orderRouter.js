var addItemToOrderRouter = require("./addItemToOrderRouter");
var orderLinesRouter = require("./orderLinesRouter");
var closeOrderByPhoneRouter = require("./closeOrderByPhoneRouter");
var express = require("express");

var orderRouter = express.Router();
orderRouter.use(addItemToOrderRouter);
orderRouter.use(orderLinesRouter);
orderRouter.use(closeOrderByPhoneRouter);

module.exports = orderRouter;


