///<reference path="../../../typings/tsd.d.ts" />
var Order = require("../models/OrderModel");
var orderSchema = require("../schemas/orderSchema");
var config = require("config");
var shipmentFee = config.get("order.shipmentFee");
var OrderFactory = (function () {
    function OrderFactory() {
    }
    OrderFactory.prototype.createNewOrder = function (cb) {
        Order.create({}, function (err, newOrder) {
            if (err)
                return cb(err);
            newOrder.status = 0 /* open */;
            newOrder.shipmentFee = shipmentFee;
            cb(null, newOrder);
        });
    };
    return OrderFactory;
})();
module.exports = new OrderFactory();
