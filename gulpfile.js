var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var handlebars  = require('gulp-compile-handlebars');
var rename      = require('gulp-rename');
var cache       = require('gulp-cache');
var imagemin    = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var data        = require('gulp-data');
var path        = require('path');
var fs          = require('fs');
var reload      = browserSync.reload;

var src = {
    scss: 'src/sass/*.scss',
    css:  'dist/css',
    hb:   'src/hb/*.handlebars',
    fonts:'src/fonts/*',
    img:  'src/img/*',
    icons:'src/icons/*',
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'hb', 'images'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.scss, ['images']);
    gulp.watch(src.hb, ['hb']);
    gulp.watch(src.hb).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

// Move fonts to dist
gulp.task('fonts', function() {
    return gulp.src(src.fonts)
        .pipe(gulp.dest('dist/fonts/'));
});

// Move icons to dist
gulp.task('icons', function() {
    return gulp.src(src.icons)
        .pipe(gulp.dest('dist/images/'));
});

// Images
gulp.task('images', function () {
    return gulp.src(src.img)
        .pipe(imageResize({
            width : 536,
            height : 284,
            crop : true,
            upscale : false
        }))   
        .pipe(cache(imagemin({
            optimizationLevel: 1,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});
 
// Compile handlebars' to html
gulp.task('hb', function () {
    var options = {
        ignorePartials: true, 
        batch : ['./src/hb/partials'],
    }
 
    return gulp.src('src/hb/*.handlebars')
        .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync('./src/data/design.json'));
        }))
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['fonts', 'icons', 'serve']);