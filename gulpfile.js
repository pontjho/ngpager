var jsPath = ['templates.js', 'ngpager.js'];

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
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
        .pipe(templateCache('templates.js', { standalone: true, module: 'ngPagerTemplates' }))
        .pipe(gulp.dest('.'));
});

gulp.task('less', function () {
    return gulp.src('style.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(concat('ngpager.min.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['lint', 'scripts', 'less']);
