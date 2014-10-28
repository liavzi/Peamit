var Price = require("../models/PriceModel");
var priceList = {
    getPrice : function(productId,callback){
        Price.find().where("productId").equals(productId).exec(function(err,prices){
            if (err) callback(err);
            else if (prices.length === 0)
            {
                var noPriceError = new Error("no price for product "+productId);
                noPriceError.name = "NoPriceForProduct";
                callback(noPriceError)
            }
            else{
                callback(null,prices[0]);
            }
        })
    }
};

module.exports = priceList;