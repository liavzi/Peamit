var Product = require("../models/ProductModel");
var Price = require("../models/PriceModel");
var async = require("async");

var productForSellingRepository = {
    getById : function(productId,callback){
        async.parallel([
            function(callback){
                Product.findById(productId,callback);
            },
            function(callback){
                Price.find().where("productId").equals(productId).exec(callback)
            }
        ],function(err,results){
            if (err) callback(err);
            var product = {};
            product._id = results[0]._id;
            product.name = results[0].name;
            var price = results[1][0];
            product.price = price.value;
            callback(null,product);
        });
    }
};

module.exports = productForSellingRepository;