///<reference path="../../../typings/tsd.d.ts" />
var _ = require("underscore");
var mongoose = require('mongoose');
var validator = require("validator");
var Schema = mongoose.Schema;
var orderLineSchema = new Schema({
    productId: Number,
    quantity: Number,
    totalPrice: Number
});
exports.orderSchema = new Schema({
    orderLines: [orderLineSchema],
    customerDetails: {
        fullName: String,
        address: String,
        phoneNumber: { type: Number },
        email: { type: String, validate: function (value) {
                return validator.isEmail(value);
            } }
    },
    status: { type: Number, min: 0 /* open */, max: 1 /* paid */ },
    paymentInformation: {},
    paidDate: Date,
    shipmentFee: { type: Number, min: 0 }
});
exports.orderSchema.virtual("total").get(function () {
    return _.reduce(this.orderLines, function (memo, orderLine) {
        return memo + orderLine.totalPrice;
    }, 0);
});
exports.orderSchema.method("addOrderLine", function (orderLineToAdd) {
    var existingOrderLineWithSameProduct = _.find(this.orderLines, function (x) { return x.productId === orderLineToAdd.productId; });
    if (existingOrderLineWithSameProduct) {
        existingOrderLineWithSameProduct.quantity += orderLineToAdd.quantity;
        existingOrderLineWithSameProduct.totalPrice += orderLineToAdd.totalPrice;
    }
    else
        this.orderLines.push(orderLineToAdd);
});
exports.orderSchema.method("removeLineById", function (orderLineId) {
    this.orderLines.id(orderLineId).remove();
});
exports.orderSchema.static("strictFindById", function (orderId, callback) {
    this.findById(orderId, function (err, order) {
        if (err)
            return callback(err);
        if (!order) {
            var error = new Error("order with id " + orderId + "does not exists");
            error.name = "OrderNotExists";
            return callback(error);
        }
        callback(null, order);
    });
});
exports.orderSchema.method("markAsPaid", function (paymentInformation, cb) {
    if (cb === void 0) { cb = function () { }; }
    var order = this;
    order.paymentInformation = paymentInformation;
    order.markModified("paymentInformation");
    order.status = 1 /* paid */;
    order.paidDate = new Date();
    cb(null);
});
exports.orderSchema.set("toJSON", { getters: true });
exports.orderSchema.set("toObject", { getters: true });
