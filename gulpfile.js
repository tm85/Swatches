var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var del = require('del');
var plumber = require('gulp-plumber');

// Path Variables
var DIST_PATH = 'public/dist';
var SCSS_PATH = 'public/styles/**/*.scss';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// Image Compression
var imagemin = require("gulp-imagemin");
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// Styles Task
gulp.task('styles', function () {
    console.log('Starting Styles Task');
    return gulp.src(["public/styles/styles.scss"])
        .pipe(plumber(function (err) {
            console.log("styles task error");
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
    console.log('Finished Styles Task');
});

// Scripts Task
gulp.task('scripts', function () {
    console.log('Starting scripts Task');
    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function (err) {
            console.log("Scripts task error");
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
    console.log('Finished scripts Task');
});

// Images Task
gulp.task('images', function () {
    console.log('Starting images Task');
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(DIST_PATH + "/images"))
    console.log('Finished images Task');
});

// Clean Task
gulp.task('clean', function () {
    return del.sync([
        DIST_PATH
    ]);
});

// Default Task
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], function () {
    console.log('Starting default Task');
    console.log('Finished default Task');
});

// Watch Task
gulp.task('watch', ['default'], function () {
    console.log('Starting watch Task');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(SCSS_PATH, ['styles']);
});