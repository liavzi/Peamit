var mongoose = require('mongoose');
var productSchema = require('../schemas/productSchema');
var Product = mongoose.model("Product",productSchema);
module.exports = Product;
