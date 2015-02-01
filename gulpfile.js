var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var paths = {
  'html': '*.jade',
  'less': 'less/**',
  'dist': 'dist/',
  'css': 'dist/css'
}

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
      index: 'index.html'
    },
    notify: true,
    xip: false
  });
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch([paths.html], ['html']);
  gulp.watch([paths.less], ['less']);
});

gulp.task('default', ['bs', 'less', 'html', 'watch']);
