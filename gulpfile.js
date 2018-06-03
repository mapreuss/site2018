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
    icons: 'src/icons/*',
    js: 'src/js/*',
    jquery: 'node_modules/jquery/dist/jquery.min.js',
    typeit: 'node_modules/typeit/dist/typeit.min.js',
};

var dist = {
    css: 'dist/css',
    fonts: 'dist/fonts',
    icons: 'dist/images/',
    img: 'dist/images',
    data: 'dist/data',
    jquery: 'dist/js',
    js: 'dist/js',
    main: './dist/'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'hb', 'images', 'js'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.scss, ['images']);
    gulp.watch(src.js, ['js']);
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

// Move data to dist
gulp.task('data', function () {
    return gulp.src('./src/data/quotes.json')
        .pipe(gulp.dest(dist.data));
});

// Move icons to dist
gulp.task('icons', function() {
    return gulp.src(src.icons)
        .pipe(gulp.dest(dist.icons));
});

// Move jQuery to dist
gulp.task('jquery', function () {
    return gulp.src(src.jquery)
        .pipe(gulp.dest(dist.jquery));
});

// Move typeit to dist
gulp.task('typeit', function () {
    return gulp.src(src.typeit)
        .pipe(gulp.dest(dist.jquery));
});

// Move ks to dist
gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(gulp.dest(dist.js));
});

// Images
gulp.task('images', function () {
    return gulp.src(src.img)
        .pipe(imageResize({
            width : 536,
            height : 284,
            crop : true,
            upscale : false,
            gravity: "North"
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

gulp.task('default', ['fonts', 'icons', 'jquery', 'typeit', 'data', 'serve']);