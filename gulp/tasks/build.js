var gulp =  require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
concatCss = require('gulp-concat-css'),
font2css = require('gulp-font2css').default,
browserSync = require('browser-sync').create();


gulp.task('previewDist', function() {
	browserSync.init({
    notify: false,
    server: {
    baseDir: "build"
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
	return del("./build");
});

gulp.task('fonts', function() {
	return gulp.src('assets/fonts/**/*.{otf,ttf,woff,woff2}')
	  .pipe(font2css())
	  .pipe(concatCss('fonts.css'))
	  .pipe(gulp.dest('temp/styles'))
  })

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./build'));
});


gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./build/assets/images'));

});


gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});


gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest('./build'));
});


gulp.task('build', ['deleteDistFolder', 'fonts', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);