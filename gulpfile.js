var gulp = require("gulp");
var plugin = require("gulp-load-plugins")();

gulp.task("default", function() {

    return gulp.src(["src/**/*.js","!src/client/ScriptsLibs/**.js"])
        .pipe(plugin.jshint())
        .pipe(plugin.jshint.reporter("jshint-stylish"))
});

