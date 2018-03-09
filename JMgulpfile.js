/**
 * Created by John on 3/6/2018.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    postcss    = require('gulp-postcss'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    es = require('event-stream'),
    glob = require("glob"),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify-es').default;

/* pathConfig*/
var entryPoint = './src/js/build.js',
    browserDir = './',
    sassWatchPath = './src/sass/**/*.scss',
    jsWatchPath = './src/js/**/*.js',
    htmlWatchPath = './**/*.html'
/**/

// gulp.task('js', function () {
//     //return browserify(entryPoint, {debug: true, extensions: ['es6']})
//     return browserify(['js/**/*.js', entryPoint], {debug: true, extensions: ['es6'//]})
//         .transform("babelify", {presets: ["es2015"]})
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./build/js'))
//         .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('js', function() {
//     // Your main files
//     var files = [
//         './js/barba.js',
//         './js/footer-reveal.js',
//         './js/jquery.easing.min.js',
//         './js/jquery.min.js',
//         './js/mixitup.min.js',
//         './js/build.js'
//     ];
//     // Create a stream array
//     var tasks = files.map(function(entry) {
//         return browserify({ entries: [entry] })
//             .bundle()
//             .pipe(source(entry))
//             .pipe(gulp.dest('./build/js')); 
//         });
//     return es.merge.apply(null, tasks);
// });

// gulp.task('js', function() {
//     return glob('./js/*.js', function(err, files) {
//         var tasks = files.map(function(entry) {
//             return browserify({ entries: [entry] })
//                 .bundle()
//                 .pipe(source(entry))
//                 .pipe(rename({
//                     extname: '.bundle.js'
//                 }))
//                 .pipe(gulp.dest('./build/js')); 
//             });
//         return es.merge.apply(null, tasks);
//     })
// });


// gulp.task('js', function() {
//   return gulp.src('js/**/*.js'
//     .pipe(concat('bundle.js'))
//     .pipe(gulp.dest('./build/js'));
// });

gulp.task('js', function() {
    return gulp.src([
        './src/js/jquery-3.3.1-min.js', 
        './src/js/jquery-1.4.1-easing-min.js', 
        './src/js/jquery.waypoints.js',
        './src/js/mixitup.min.js',
        './src/js/barba.min.js',
        './src/js/build.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
  var plugins = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];
  return gulp.src(sassWatchPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);