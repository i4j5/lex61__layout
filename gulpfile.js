const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const webpack = require("webpack");

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('clean', () => {
    return gulp.src(['./app/tmp/**/*.*', './app/*.html', './dist'], {read: false})
        .pipe(clean());
});

gulp.task('js', () => {
    return gulp.src(['./app/js/*.js', '!./app/js/*.module.js'])
        .pipe(plumber({
            errorHandler: notify.onError(function (err) { 
                return {
                    title: 'ES6',
                    message: err.message
                }
            })
        }))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('./app/tmp'));
});

gulp.task('webpack', () => {
    webpack(require('./webpack.config.js'),(err, stats) => {

    });
});

gulp.task('jade', () => {
    return gulp.src('app/jade/*.jade')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) { 
                return {
                    title: 'Jade',
                    message: err.message
                }
            })
        }))
        .pipe(jade({pretty: true}))
        // .pipe(rename((path) => {
        //     path.dirname = '';
        //     path.extname = '.html'
        // }))
        .pipe(gulp.dest('./app'));
});

gulp.task('style', () => {
    return gulp.src('./app/style/*.styl')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) { 
                return {
                    title: 'Style',
                    message: err.message
                }
            })
        }))
        .pipe(stylus({
            'include css': true
        }))
        .pipe(csso({
           restructure: false,
           sourceMap: true,
           debug: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/tmp'));
});

gulp.task('build', ['clean', 'style', 'js', 'webpack', 'jade'], () => {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./dist'))
        .on('end', () => {
            gulp.run('font');
            gulp.run('img');
        });
});

gulp.task('font', () => {
    return gulp.src('./app/fonts/**/*.{otf,ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('img', () => {
    return gulp.src('./app/img/**/*.{jpg,jpeg,png,gif,ico,tif,svg}')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) { 
                return {
                    title: 'Img',
                    message: err.message
                }
            })
        }))
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', () => {
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./app/jade/**/*.jade', ['jade']);
    gulp.watch('./app/style/**/*.styl', ['style']);
    gulp.watch('./app/webpack/**/*.*', ['webpack']);
    gulp.watch('./app/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'jade', 'style', 'js', 'webpack', 'browser-sync', 'watch']);
