var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tagSchema   = new Schema({
    name: String,
    productIds : [Number],
    type : String,
    imageUrl : String
});

module.exports = tagSchema;