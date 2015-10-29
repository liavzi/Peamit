var Order = require("../models/OrderModel");
var closeOrderByPhoneService = {};
closeOrderByPhoneService.closeOrderByPhone = function(request,callback){
    var order = request.order;
    order.closeByPhone(request.customerDetails,function(err){
        if (err) callback(err);
        order.save(callback,function(err){
            if (err) return err;
            callback();
        });
    });
};

module.exports = closeOrderByPhoneService;