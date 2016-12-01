var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build-scripts', function () {
    return gulp.src([
        'js/*.js',
        'config/*.js',
        'bootstrap/*.js',
        'controllers/*.js',
        'components/*/controllers/*.js',
        'models/*.js',
        'services/*.js',
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-angular', function () {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-cookies/angular-cookies.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    ])
        .pipe(concat('angular-full.js'))
        .pipe(gulp.dest('build'));
});