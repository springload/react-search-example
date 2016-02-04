var gulp = require('gulp');

require('./gulp/watch');
require('./gulp/js');
require('./gulp/css');

gulp.task('build', ['js', 'css', 'svg']);

gulp.task('default', ['build']);
