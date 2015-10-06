///<reference path="../../../typings/tsd.d.ts" />
import _ = require("underscore");
import mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderLineSchema = new Schema({
    productId : Number,
    quantity : Number,
    totalPrice : Number
});
var orderSchema   = new Schema({
    orderLines : [orderLineSchema],
    customerDetails : {
        fullName : String,
        address : String,
        phoneNumber : Number,
        email : String
    },
    state : String,
    closeDetails : {
        method :String
    }
});

orderSchema.virtual("total").get(function(){
    return _.reduce(this.orderLines, function(memo, orderLine :any){
        return memo + orderLine.totalPrice;},0);
});

orderSchema.method("addOrderLine",function(orderLineToAdd){
    var existingOrderLineWithSameProduct = _.find(this.orderLines,function(x :any){return x.productId===orderLineToAdd.productId;});
    if (existingOrderLineWithSameProduct)
    {
        existingOrderLineWithSameProduct.quantity+=orderLineToAdd.quantity;
        existingOrderLineWithSameProduct.totalPrice+=orderLineToAdd.totalPrice;
    }
    else
        this.orderLines.push(orderLineToAdd);
});

orderSchema.method("removeLineById",function(orderLineId){
    this.orderLines.id(orderLineId).remove();
});

orderSchema.method("closeByPhone",function(customerDetails){
    if (!customerDetails.phoneNumber) throw new Error("Customer must supply phone number");
    this.customerDetails = customerDetails;
    this._close({method:"ClosedByPhone"});
    //var orderAsString = JSON.stringify(this);
    //mailSender.send(orderAsString);
});

orderSchema.method("_close", function(closeDetails){
    this.state = "Closed";
    this.closeDetails = closeDetails;
});

orderSchema.static("strictFindById",function(orderId,callback){
    this.findById(orderId,function(err,order) {
        if (err) return callback(err);
        if (!order){
            var error = new Error("order with id " + orderId + "does not exists");
            error.name = "OrderNotExists";
            return callback(error);
        }
        callback(null,order);
    });
});

orderSchema.set("toJSON",{getters:true});
orderSchema.set("toObject",{getters:true});

export = orderSchema;