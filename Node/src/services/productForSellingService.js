var productForSellingRepository = require("../businessComponents/productForSellingRepository");

var productForSellingService = {
    getById : function(productId,callback){
        productForSellingRepository.getById(productId,callback)
    }
};

module.exports = productForSellingService;