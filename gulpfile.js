var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const hb        = require('gulp-hb');
var cache       = require('gulp-cache');
var imagemin    = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var reload      = browserSync.reload;

var src = {
    scss: 'src/sass/*.scss',
    hb:   {
        main: 'src/hb/*.html',
        data: './src/data/**/*.json',
        partials: './src/hb/partials/**/*.handlebars'
    },
    fonts:'src/fonts/*',
    img:  'src/img/*',
    icons:'src/icons/*',
};

var dist = {
    css: 'dist/css',
    fonts: 'dist/fonts',
    icons: 'dist/images/',
    img: 'dist/images',
    main: './dist/'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'hb', 'images'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.scss, ['images']);
    gulp.watch(src.hb.main, ['hb']);
    gulp.watch(src.hb.data, ['hb']);
    gulp.watch(src.hb.main).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist.css))
        .pipe(reload({stream: true}));
});

// Move fonts to dist
gulp.task('fonts', function() {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(dist.fonts));
});

// Move icons to dist
gulp.task('icons', function() {
    return gulp.src(src.icons)
        .pipe(gulp.dest(dist.icons));
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
        .pipe(gulp.dest(dist.img));
});
 
// Compile handlebars' to html
gulp.task('hb', function () {
    return gulp.src(src.hb.main)
        .pipe(hb()
            .partials(src.hb.partials)
            .data(src.hb.data)
        )
        .pipe(gulp.dest(dist.main));
});

gulp.task('default', ['fonts', 'icons', 'serve']);