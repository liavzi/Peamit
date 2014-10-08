var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
	_id : Number,
	name: String,
});

module.exports = productSchema;