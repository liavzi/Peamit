///<reference path="../../../typings/tsd.d.ts" />
import express = require("express");
import multer = require("multer");
let imagesRouter = express.Router();
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "src/client/resources/images/")
	},
	filename: function (req, file, cb) {

		// var getFileExt = function(fileName){
		// 	var fileExt = fileName.split(".");
		// 	if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
		// 		return "";
		// 	}
		// 	return fileExt.pop();
		// }
		cb(null,file.originalname);
	}
})
let upload = multer({
		storage : storage
	}).array("file[0]",500);
imagesRouter.route("/images")
	.post(upload,function(req,res,next){
		res.status(200);
		res.end();
	});


export = imagesRouter;