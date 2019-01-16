'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var argv = require('yargs').argv;
var gulpif =  require('gulp-if');


var isProduction;
if(argv.prod){
    isProduction = true;
}else{
    isProduction = false;
}

gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProduction, cssnano(), sourcemaps.write('maps')))
    .pipe(gulp.dest('./assets/css'));
});

// ------------------------------------ Gulp Testing Message
gulp.task('message', function(){
    console.log(isProduction);
  });

gulp.task('watch:styles', function () {
    gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
});
  
gulp.task('watch', gulp.series('sass',
    gulp.parallel('message','watch:styles')

));



