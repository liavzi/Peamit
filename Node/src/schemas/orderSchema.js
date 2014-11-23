var _ = require("underscore");
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

orderSchema.virtual("total").get(function(){
    return _.reduce(this.orderLines, function(memo, orderLine){
    return memo + orderLine.totalPrice;}
    , 0);
});

orderSchema.methods.addOrderLine = function(orderLineToAdd){
    var existingOrderLineWithSameProduct = _.find(this.orderLines,function(x){return x.productId===orderLineToAdd.productId;});
    if (existingOrderLineWithSameProduct)
    {
        existingOrderLineWithSameProduct.quantity+=orderLineToAdd.quantity;
        existingOrderLineWithSameProduct.totalPrice+=orderLineToAdd.totalPrice;
    }
    else
        this.orderLines.push(orderLineToAdd);
};

orderSchema.methods.removeLineById= function(orderLineId){
    this.orderLines.id(orderLineId).remove();
};

module.exports = orderSchema;