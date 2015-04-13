var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    Autoprefix = require('less-plugin-autoprefix');

gulp.task('styles', function() {
  return gulp.src('./src/less/*.less')
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')} ))
    .pipe($.less({plugins: (new Autoprefix()) }) )
    .pipe(gulp.dest('./build/css'))
    .pipe(reload({stream: true}));
});

gulp.task('copy', function() {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch('./src/less/**/*.less', ['styles']);
  gulp.watch('./src/*.html', ['copy']);
});

gulp.task('build', ['styles', 'copy']);

gulp.task('default', ['build', 'server']);