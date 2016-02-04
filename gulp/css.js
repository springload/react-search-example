// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

var config = require("./config");
var gulp = require('gulp');
var path = require('path');

var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plz = require("gulp-pleeease");
var sassLint = require('gulp-sass-lint');
var parker = require('gulp-parker');
var bs = require('browser-sync').get('main');


gulp.task('css', function() {

    return gulp.src(path.join( config.paths.sass, '**', "*.scss" ))
        .pipe(sass())
        .on('error', function handleError(err) {
            gutil.log(err.message);
            bs.notify(err.message, 10000);
            this.emit('end');
        })
        .pipe(plz( config.PlzOptions ))
        .pipe(gulp.dest( config.paths.css ))
        .pipe(bs.stream());
});


// ----------------------------------------------------------------------------
// Sass Lint
// ----------------------------------------------------------------------------

gulp.task('lint:sass', function() {
  gulp.src( path.join(config.paths.sass, '**', '*.scss') )
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});



// ----------------------------------------------------------------------------
// CSS Reporter
// ----------------------------------------------------------------------------

gulp.task('report:css', function() {
    return gulp.src( path.join(config.paths.css, '**', '*.css') )
        .pipe(parker({
            file: path.join(config.paths.css, 'css-report.md'),
            title: 'Gulp test report',
            metrics: [
                'TotalStylesheets',
                'TotalStylesheetSize',
                'TotalRules',
                'TotalSelectors',
                'TotalIdentifiers',
                'TotalDeclarations',
                'SelectorsPerRule',
                'IdentifiersPerSelector',
                'SpecificityPerSelector',
                'TopSelectorSpecificity',
                'TopSelectorSpecificitySelector',
                'TotalIdSelectors',
                'TotalUniqueColours',
                'TotalImportantKeywords',
                'TotalMediaQueries'
            ]
        })
    );
});
