var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('src/promise.js')
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@copyright|@license|@cc_on/i
      }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress']);
