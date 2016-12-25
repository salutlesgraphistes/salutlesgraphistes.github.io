"use strict";

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

gulp.task('watch', ['sass'], () => {
  browsersync.init({
    server:{
      baseDir:'./',
    },
  });
  gulp.watch('./src/css/**/*.scss', ['sass']);
  gulp.watch('./index.html').on('change',browsersync.reload);
} );

gulp.task('sass', () => {
  return gulp.src('./src/css/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    browsers: ['last 6 versions']
}))
  .pipe(cssmin())
  .pipe(gulp.dest('./dist/css'))
  .pipe(browsersync.stream());
});

gulp.task('default', ['watch']);
