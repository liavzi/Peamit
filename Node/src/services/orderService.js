var GenericService = require("./genericService");
var OrderService = function(){};
var Order = require("../models/OrderModel");
OrderService.prototype = new GenericService(Order);
OrderService.prototype.createOrUpdate = function(entity,callback){
    throw new Error("Not implemented!");
}

OrderService.prototype.create = function(orderCreationArgs,callback){
    Order.create({},callback)
};

var orderService = new OrderService();
module.exports = orderService;