// -----------------------------------------------------------
var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	autoPrefixer 	= require('gulp-autoprefixer')
    browserify 		= require('gulp-browserify'),
    concat			= require('gulp-concat'),
    sourcemaps      = require('gulp-sourcemaps'),
    livereload 		= require('gulp-livereload'),
    webserver 		= require('gulp-webserver')
// -----------------------------------------------------------



//Process sass to css save to destination. Also adds sourcemap for debugging sass file.
gulp.task('sass', function() {
	gulp.src("src/sass/*.scss")
	.pipe(sass())
    .pipe(sourcemaps.init())
	.on('error', function(error) {
		console.log(error);
		this.emit('end');
	})
	.pipe(autoPrefixer())
    .pipe(sourcemaps.write())
	.pipe(gulp.dest('build/assets/css'));
});

//Minify js and save to destination.
gulp.task('browserify', function() {
	gulp.src(['src/js/app.js'])
	.pipe(browserify({
		insertGlobals: true,
		debug: true
	}))
	.on('error', function(error) {
		console.log(error);
		this.emit('end');
	})
	.pipe(concat('app.js'))
	.pipe(gulp.dest('build/assets/js'));
});

//Reload browser upon build-css. Not necessary for server build. If this is desired, change gulp.src, and open and fallback options.
gulp.task('webserver', function() {
  gulp.src('./src')
    .pipe(webserver({
      livereload: true,
      open: 'http://rest:8888/',
      fallback: 'index.php'
    }));
});

//Watch files to reload browser when updated. Not necessary for server build
gulp.task('watch', function() {
	gulp.watch("src/sass/**/*", ['sass']);
    gulp.watch('src/js/**', ['browserify']);
});

//Build and watch tasks. Build task, watch optional
gulp.task('build-all',['sass','browserify']);
gulp.task('default',['watch','webserver']);
