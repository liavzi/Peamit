define(["require", "exports", "./infra-module"], function (require, exports, app) {
    var ImageMaintenance = (function () {
        function ImageMaintenance(Upload) {
            this.Upload = Upload;
        }
        ImageMaintenance.prototype.uploadFiles = function () {
            if (this.files && this.files.length) {
                // for (var i = 0; i < this.files.length; i++) {
                //   this.Upload.upload({..., data: {file: files[i]}, ...})...;
                // }
                // or send them all together for HTML5 browsers:
                this.Upload.upload({ url: "/api/images", data: { file: this.files } }).then(function () {
                    alert("uploaded");
                });
            }
        };
        ImageMaintenance.$inject = ["Upload"];
        return ImageMaintenance;
    })();
    app.controller("imageMaintenance", ImageMaintenance);
});
