var gulp = require('gulp');
var path = require('path');
var config = require('./config');
var gutil = require('gulp-util');
var swPrecache = require('sw-precache');

var prod = process.env.NODE_ENV === 'production';

function writeServiceWorkerFile(done) {
  var conf = {
    cacheId: 'react-search-example',
    dynamicUrlToDependencies: {

    },
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: prod,
    logger: gutil.log,
    staticFileGlobs: [
      path.join(config.paths.views, 'index.html'),
      path.join(config.paths.css, 'screen.css'),
      path.join(config.paths.js, 'site.js'),
    ],
    stripPrefix: config.paths.views + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(config.paths.views, 'service-worker.js'), conf, done);
}

gulp.task('generate-service-worker', ['js', 'css'], function(done) {
  writeServiceWorkerFile(done);
});

