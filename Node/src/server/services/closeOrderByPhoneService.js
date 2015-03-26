var Order = require("../models/OrderModel");
var closeOrderByPhoneService = {};
closeOrderByPhoneService.closeOrderByPhone = function(request,callback){
    var order = request.order;
    order.closeByPhone(request.customerDetails);
    order.save(callback);
};

module.exports = closeOrderByPhoneService;