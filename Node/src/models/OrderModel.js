var mongoose = require('mongoose');
var orderSchema = require('../schemas/orderSchema');
var Order = mongoose.model("Order",orderSchema);
module.exports = Order;
