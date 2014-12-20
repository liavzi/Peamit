var Order = require("../models/OrderModel");
var closeOrderByPhoneService = {};
closeOrderByPhoneService.closeOrderByPhone = function(request,callback){
    Order.strictFindById(request.orderId,function(err,order){
        if (err) return callback(err);
        order.closeByPhone(request.customerDetails);
        order.save(callback);
    });
};

module.exports = closeOrderByPhoneService;