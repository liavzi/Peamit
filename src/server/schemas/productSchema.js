var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
	_id : Number,
	name: {type:String,required:true},
	prices : [{
		value : Number,
		startDate : Date,
		endDate : Date
	}],
	quantityInPkg : Number,
	imageUrl : String
});

module.exports = productSchema;