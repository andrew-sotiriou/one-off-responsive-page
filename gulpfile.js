// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss') 
    .pipe(sass())
    .pipe(gulp.dest('html/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'move-html', 'move-images', 'move-videos', 'move-js'], function (){
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/index.html', ['move-html']); 
  gulp.watch('app/images/*.png', ['move-images']); 
  gulp.watch(['app/videos/*.mp4', 'app/videos/*.vtt'], ['move-videos']); 
  gulp.watch('app/js/*.js', ['move-js']); 
  // Other watchers
})

gulp.task('move-html', function(){
  return gulp.src('app/index.html')
    .pipe(gulp.dest('html'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('move-images', function(){
  return gulp.src('app/images/*.png')
    .pipe(gulp.dest('html/images'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('move-videos', function(){
  return gulp.src(['app/videos/*.mp4', 'app/videos/*.vtt'])
    .pipe(gulp.dest('html/videos'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('move-vtt', function(){
  return gulp.src('app/videos/*.vtt')
    .pipe(gulp.dest('html/videos'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('move-js', function(){
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('html/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'html'
    },
    port: 8000
  })
})

// Default Task
gulp.task('default', ['watch']);