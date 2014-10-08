var Product = require("../models/ProductModel");


var productService = {
	createProduct : function(product,callback){
		console.log(product);
		Product.create(product,function(err,savedProduct){
			if (err) callback(err);
			callback(err,savedProduct);
		});
	}
};

module.exports = productService;