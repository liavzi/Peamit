var Order = require("../models/OrderModel");
var itemSeller = require("../businessComponents/itemSeller");
var addItemToOrderService = {};
addItemToOrderService.addItemToOrder = function(request,callback){
    Order.strictFindById(request.orderId,function(err,order){
        if (err) return callback(err);
        itemSeller.sell(order,request.saleInfo,function(err,order){
            if (err)  return callback(err);
            order.save(callback);
        });
    });
};

module.exports = addItemToOrderService;