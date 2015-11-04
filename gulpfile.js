var fs = require('fs');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var licenser = require('gulp-licenser');
var jscs = require('gulp-jscs');
var should = require('should');

gulp.task('default', ['style', 'test']);

gulp.task('test', function () {
    return gulp.src(['tests/*.js'], {read: false})
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: should
            }
        }));
});

gulp.task('style', function () {
    return gulp.src(['*.js', 'libs/*.js', 'tests/*.js', 'example/*/*.js'], {base: '.'})
        .pipe(jscs({fix: true, configPath: './style.json'}))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('.'));
});

gulp.task('copyright', function () {
    gulp.src(['libs/*.js', 'tests/*.js'], {base: '.'})
        .pipe(licenser(fs.readFileSync('./copyright', 'utf8')))
        .pipe(gulp.dest('.'))
});
