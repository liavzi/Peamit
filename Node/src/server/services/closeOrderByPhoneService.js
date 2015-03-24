var Order = require("../models/OrderModel");
var closeOrderByPhoneService = {};
closeOrderByPhoneService.closeOrderByPhone = function(request,callback){
    var order = req.order;
    order.closeByPhone(request.customerDetails);
    order.save(callback);
};

module.exports = closeOrderByPhoneService;