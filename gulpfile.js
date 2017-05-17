var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    scripts: ['www/js/co-lite/*.js']
};

gulp.task('scripts', function() {
    return gulp
        .src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('colite.min.js'))
        .pipe(gulp.dest('bin'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/js'));
});

/*** Rerun tasks when a file changes ***/
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);