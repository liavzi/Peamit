var GenericService = require("./genericService");
var OrderService = function(){};
var Order = require("../models/OrderModel");
var genericService = new GenericService(Order);
OrderService.prototype = genericService;
OrderService.prototype.createOrUpdate = function(entity,callback){
    throw new Error("Not implemented!");
}

OrderService.prototype.create = function(orderCreationArgs,callback){
    Order.create({},callback)
};

var orderService = new OrderService();

orderService.getById = function(id,callback){
    genericService.getById(id,function(err,order){
        if (err) return callback(err);
        var orderResponse = order.toObject();
        orderResponse.total = order.total;
        callback(null,orderResponse);
    });
};

module.exports = orderService;