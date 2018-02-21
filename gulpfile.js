const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const vinylPaths = require('vinyl-paths');
const directories = require('./gulp/directories');
const sequence = require('run-sequence');

gulp.task('clean', () => gulp.src([directories.build]).pipe(vinylPaths(del)));

gulp.task('index', () =>
  gulp
    .src(`${directories.src}/index.html`, { base: directories.src })
    .pipe(gulp.dest(directories.build))
);

gulp.task('sass', () => {
  gulp
    .src(`${directories.cssSrc}/**/*.scss`, { base: directories.cssSrc })
    .pipe(sass())
    .pipe(gulp.dest(directories.cssBuild));
});

gulp.task('build', cb => {
  sequence('clean', 'index', 'sass', cb);
});
