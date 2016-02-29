///<reference path="../../../typings/tsd.d.ts" />
import mongoose = require("mongoose");
import schemas = require("schemas");
var validator = require("validator");
let clubRegistrationSchema = new mongoose.Schema({
	customerName : {type:String,required : true}
	,customerPhone : {type: String,required : true}
	,customerMail : { 
		type: String
		,validate: function (value) {
			return validator.isEmail(value);
		}
		,required : true 
	}
	,submittedDate : {type :Date ,default : Date.now}
});


export  = mongoose.model("ClubRegistration",clubRegistrationSchema);
