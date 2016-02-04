var gulp = require('gulp');

require('./gulp/watch');
require('./gulp/js');
require('./gulp/css');
require('./gulp/sw');

gulp.task('build', ['generate-service-worker'])

gulp.task('default', ['build']);
