var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    fs = require('fs'),
    Autoprefix = require('less-plugin-autoprefix');

gulp.task('styles', ['concat-flags'], function() {
  return gulp.src('./src/less/*.less')
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')} ))
    .pipe($.less({plugins: (new Autoprefix()) }) )
    .pipe(gulp.dest('./build/css'))
    .pipe(reload({stream: true}));
});

gulp.task('concat-flags', function(cb) {
  return gulp.src('./src/less/import/flags/*.less')
    .pipe($.concat('flags-all.less'))
    .pipe(gulp.dest('./src/less/import/'));
});

gulp.task('layout', function() {
  gulp.src('./src/*.html')
    .pipe($.ejs({
      flags: fs.readdirSync('./src/less/import/flags/'),
      sizes: ['xs','sm','md','lg','xl']
    }))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch('./src/less/**.less', ['styles']);
  gulp.watch('./src/*.html', ['layout']);
});

gulp.task('build', ['styles', 'layout']);

gulp.task('default', ['build', 'server']);