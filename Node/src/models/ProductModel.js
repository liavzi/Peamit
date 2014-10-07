var mongoose = require('mongoose');
var producySchema = require('../schemas/productSchema');
var Product = mongoose.model("Product",productSchema);
module.exports = Product;
