var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var options = {
    service : "gmail",
    auth : {
        user : "liavzi@gmail.com",
        pass : "Lz124812"
    }
};
var transporter = nodemailer.createTransport(smtpTransport(options));


var mailSender = {};
mailSender.send = function(text){
    var mailOptions = {
        from: "liavzi@gmail.com", // sender address
        to: "liavzi@gmail.com", // list of receivers
        subject: "A new order was received", // Subject line
        text: text // plaintext body
    };
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};

module.exports = mailSender;