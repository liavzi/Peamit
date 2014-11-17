var Order = require("../models/OrderModel");
var itemSeller = require("../businessComponents/itemSeller");
var addItemToOrderService = {};
addItemToOrderService.addItemToOrder = function(request,callback){
    Order.findById(request.orderId,function(err,order){
        if (err)
            callback(err);
        else if (!order)
            callback(new Error("order with id"+request.orderId+"does not exists"));
        else
            itemSeller.sell(order,request.saleInfo,callback);
    });
};

module.exports = addItemToOrderService;