var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
	_id : Number,
	name: String,
	imageUrl : String
});

module.exports = productSchema;