///<reference path="../../../typings/tsd.d.ts" />
var express = require("express");
var multer = require("multer");
var imagesRouter = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/client/resources/images/");
    },
    filename: function (req, file, cb) {
        // var getFileExt = function(fileName){
        // 	var fileExt = fileName.split(".");
        // 	if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
        // 		return "";
        // 	}
        // 	return fileExt.pop();
        // }
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
}).array("file[0]", 500);
imagesRouter.route("/images")
    .post(upload, function (req, res, next) {
    res.status(200);
    res.end();
});
module.exports = imagesRouter;
