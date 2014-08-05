var jsPath = ['templates.js', 'pager.js'];

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(jsPath)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['templates'], function() {
    return gulp.src(jsPath)
        .pipe(concat('all.js'))
        .pipe(rename('ngpager.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('templates', function () {
    gulp.src(['*.tpl.html'])
        .pipe(templateCache('templates.js', { standalone: true, module: 'ngpagerTemplates' }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['lint', 'scripts']);
