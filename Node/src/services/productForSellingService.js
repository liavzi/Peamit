var productForSellingRepository = require("../businessComponents/productForSellingRepository");

var productForSellingService = {
    getAll : function(callback){
        productForSellingRepository.getAll(callback);
    },
    getById : function(productId,callback){
        productForSellingRepository.getById(productId,callback)
    }
};

module.exports = productForSellingService;