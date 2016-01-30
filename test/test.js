'use strict';

var fs = require('./lib/fs-intercept');

var test = require('tape'),
    relative = require('path').relative.bind(null, process.cwd()),
    absolute = require('path').resolve;


fs = fs();
var rfs = require('..');


test('fs methods', function (t) {
  fs.once('writeFileSync', function () {
    t.deepEqual([].slice.call(arguments), [
      relative(__filename),
      absolute(__filename),
      options,
      callback
    ], 'called with modified path arguments');
    t.end();
  });

  var path = absolute(__filename);
  var options = { encoding: 'utf8' };
  var callback = function () { t.fail() };

  rfs.writeFileSync(path, path, options, callback);
});
