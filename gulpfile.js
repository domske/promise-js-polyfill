var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
      gulp.src('src/promise.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('default', ['compress']);