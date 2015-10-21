///<reference path="../../../typings/tsd.d.ts"/>
import app = require("./infra-module");
class ImageMaintenance{
	static $inject = ["Upload"];	
	public files;
	constructor(private Upload){}
	uploadFiles() {
      if (this.files && this.files.length) {
        // for (var i = 0; i < this.files.length; i++) {
        //   this.Upload.upload({..., data: {file: files[i]}, ...})...;
        // }
        // or send them all together for HTML5 browsers:
        this.Upload.upload({url :"/api/images", data: {file: this.files}}).then(()=>{
			alert("uploaded");
		});
      }
    }
}


app.controller("imageMaintenance",ImageMaintenance);