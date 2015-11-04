var Order = require("../models/OrderModel");
var orderSchema = require("../schemas/orderSchema");
var OrderFactory = (function () {
    function OrderFactory() {
    }
    OrderFactory.prototype.createNewOrder = function (cb) {
        Order.create({}, function (err, newOrder) {
            if (err)
                return cb(err);
            newOrder.status = 0 /* open */;
            cb(null, newOrder);
        });
    };
    return OrderFactory;
})();
module.exports = new OrderFactory();
