var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var orderLineSchema = new Schema({
    productId : Number,
    quantity : Number,
    totalPrice : Number
});
var orderSchema   = new Schema({
    orderLines : [orderLineSchema]
});

module.exports = orderSchema;