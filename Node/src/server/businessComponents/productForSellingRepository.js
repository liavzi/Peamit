var Product = require("../models/ProductModel");
var Price = require("../models/PriceModel");
var priceList = require("./priceList");
var async = require("async");
var Tag = require("../models/TagModel");

var productForSellingRepository = {};
productForSellingRepository.getById =function(productId,callback){
    Product.findById(productId,function(err,product){
        if (err) return callback(err);
        var productForSelling = createProductForSelling(product);
        if (!productForSelling.price){
            var error = new Error();
            error.name = "NoPriceForProduct";
            return callback(error);
        }
        callback(null,productForSelling);
    });
};

productForSellingRepository.getAll = function(searchCriteria,callback){
    var productWithPrices = [];
    var getById = this.getById;
    Tag.findById(searchCriteria.tagId,function(err,tag){
        if (err) return callback(err);
        async.each(tag.productIds,function(productId,done){
            getById(productId,function(err,productWithPrice){
                if (err)
                    if (err.name!="NoPriceForProduct")
                        done(err);
                    else
                        done();
                else
                {
                    productWithPrices.push(productWithPrice);
                    done();
                }
            });
        },function(err){
            callback(err,productWithPrices);
        });
    });
};

function createProductForSelling(dbProduct) {
    var productForSelling = dbProduct.toObject();
    productForSelling.prices = null;
    if (dbProduct.prices && dbProduct.prices.length>0)
        productForSelling.price = dbProduct.prices[0];
    return productForSelling;
}

module.exports = productForSellingRepository;