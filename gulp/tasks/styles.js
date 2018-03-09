var gulp = require('gulp'),
postcss = require('gulp-postcss'),
sass    = require('gulp-sass'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba'),
concatcss = require('gulp-concat-css'),
cssnext = require('postcss-cssnext');


gulp.task('styles', function() {
  return gulp.src(['./app/assets/styles/**/*.scss', './app/assets/styles/vendor/**/*.css' ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatcss('main.css'))
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, cssnext]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});

// return (
//   //gulp.src('./src/css/**/*.scss')
//   //.pipe(sass.sync().on('error', sass.logError))
//   //.pipe(concatcss('all.css'))
//   .pipe(postcss([
//     cssNext()
//   ]))
//   .pipe(gulp.dest('./dist/css'))
// )