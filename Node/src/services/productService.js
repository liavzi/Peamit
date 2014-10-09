var Product = require("../models/ProductModel");


var productService = {
	createProduct : function(product,callback){
		Product.create(product,function(err,savedProduct){
			if (err) callback(err);
			callback(err,savedProduct);
		});
	},
	getAllProducts : function(callback){
		Product.find({},function(err,products){
			if (err) callback(err);
			callback(err,products);
		});
	},
	getProduct : function(productId,callback){
		Product.findById(productId,function(err,product){
			if (err) callback(err);
			callback(err,product);
		});
	},
	updateProduct : function(product,callback){
		Product.update({_id:product._id},product,function(err){
			if (err) callback(err);
			callback();
		});
	},
};

module.exports = productService;