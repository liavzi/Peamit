var express = require("express");
var productService = require("../services/productService");
var productRouter = express.Router();
productRouter.route("/products")
	.post(function (req,res){
		productService.createProduct(req.body,function(err,product){
			if (err) res.end(err.toString());
			res.json(product);
			res.end();
		});		
	});

module.exports = productRouter;

