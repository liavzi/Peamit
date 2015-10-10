var gulp = require("gulp");
var plugin = require("gulp-load-plugins")();
var ts = plugin.typescript;

var tsServerProject = ts.createProject({
   declarationFiles: false,
   noExternalResolve: false,
   module: 'commonjs',
   target: 'ES5'
});

var srcServer = ['src/server/**/*.ts',"src/schemas/**/*.ts"];

gulp.task('watch-server', ['compile-server'], watchServer);
gulp.task('compile-server', compileServer);

function watchServer(params) {
   gulp.watch(srcServer, ['compile-server']);
}

function compileServer(params) {
   var tsResult = gulp.src(srcServer)     
      .pipe(ts(tsServerProject));

   return tsResult.js
      .pipe(gulp.dest('src/server/'));

}

