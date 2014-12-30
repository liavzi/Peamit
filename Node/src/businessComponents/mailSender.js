var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport();


var mailSender = {};
mailSender.send = function(text){
    var mailOptions = {
        from: "asdsad@walla.com", // sender address
        to: "asdi@gmail.com", // list of receivers
        subject: "A new order was received", // Subject line
        text: text // plaintext body
    };
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};

module.exports = mailSender;