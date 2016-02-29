///<reference path="../../../typings/tsd.d.ts" />
var mongoose = require("mongoose");
var validator = require("validator");
var clubRegistrationSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerMail: {
        type: String,
        validate: function (value) {
            return validator.isEmail(value);
        },
        required: true
    },
    submittedDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model("ClubRegistration", clubRegistrationSchema);
