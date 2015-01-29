var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
	_id : Number,
	name: String,
	prices : [{
		value : Number,
		startDate : Date,
		endDate : Date
	}],
	imageUrl : String
});

module.exports = productSchema;