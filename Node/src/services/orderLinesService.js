var Order = require("../models/OrderModel");
var orderLinesService = {};
orderLinesService.removeLineFromOrder = function(request,callback){
    Order.findById(request.orderId,function(err,order){
        if (err)
            callback(err);
        else if (!order)
            callback(new Error("order with id"+request.orderId+"does not exists"));
        else
        {
            order.removeLineById(request.orderLineId);
            order.save(function(err){
                if (err) return callback(err);
                callback(null,order);
            });
        }
    });
};

module.exports = orderLinesService;