var Product = require("../models/ProductModel");
var Price = require("../models/PriceModel");
var async = require("async");

var productForSellingRepository = {
    getById : function(productId,callback){
        async.parallel([
            function(callback){getProduct(productId,callback)},
            function(callback){getPrice(productId,callback)}],
            createAndReturnProductForSelling(callback));
    },

    getAll : function(callback){
        var productWithPrices = [];
        var getById = this.getById;
        Product.find().select("_id").exec(function(err,productsIds){
            async.each(productsIds,function(productId,done){
                getById(productId,function(err,productWithPrice){
                    if (err) done(err);
                    else
                    {
                        productWithPrices.push(productWithPrice);
                        done();
                    }
                })
            },function(err){
                callback(err,productWithPrices);
            });
        });
    }
};

var getProduct =  function (productId, callback) {
    Product.findById(productId,callback);
};

var getPrice =  function (productId, callback) {
    Price.find().where("productId").equals(productId).exec(callback)
};

function createProductForSelling(results) {
    var product = results[0].toObject();
    var price = results[1][0];
    product.price = price.value;
    return product;
}
var createAndReturnProductForSelling = function (callback){
    return function(err,results) {
        if (err) callback(err);
        var product = createProductForSelling(results);
        callback(null, product);
    };
};

module.exports = productForSellingRepository;