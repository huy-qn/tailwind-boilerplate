'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./styles/scss/*.scss", ['sass']);
    gulp.watch("./styles/css/*.css", ['tailwind', browserSync.reload]);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./styles/scss/*.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('tailwind', function () {
    return gulp.src('./styles/css/main.css')
        .pipe(postcss([
            tailwindcss('./tailwind.js'),
            autoprefixer,
        ]))
        .on('error', swallowError)
        .pipe(gulp.dest('./styles/public/css/'))
})

gulp.task('default', ['start']);

function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString())
    this.emit('end')
}
