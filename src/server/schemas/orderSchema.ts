///<reference path="../../../typings/tsd.d.ts" />
import _ = require("underscore");
import mongoose     = require('mongoose');
import BusinessError  = require("../errors/BusinessError");
var validator = require("validator");
var Schema       = mongoose.Schema;

var orderLineSchema = new Schema({
    productId : Number,
    quantity : Number,
    totalPrice : Number
});

export const enum OrderStatus{
    open
    ,paid
}

export interface IOrder extends mongoose.Document{
    status : OrderStatus;
    markAsPaid(cb?:(err:Error)=>any);
    total : number;
}


export var orderSchema   = new Schema({
    orderLines : [orderLineSchema],
    customerDetails : {
        fullName : String,
        address : String,
        phoneNumber : {type : Number},
        email : {type : String ,validate : function(value){
            return validator.isEmail(value);
        }}
    },
    status : {type:Number,min:OrderStatus.open,max:OrderStatus.paid}
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

orderSchema.method("closeByPhone",function(customerDetails,cb :Function){
    this.customerDetails = customerDetails;
    if (!customerDetails.phoneNumber) cb(new BusinessError("חובה לציין מס טלפון"));
    this._close({method:"ClosedByPhone"});
    cb(null);
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

orderSchema.method("markAsPaid",function(cb :Function = ()=>{} ){
    let order = <IOrder> this;
    order.status = OrderStatus.paid;
    cb(null);
});

orderSchema.set("toJSON",{getters:true});
orderSchema.set("toObject",{getters:true});