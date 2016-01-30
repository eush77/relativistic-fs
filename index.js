'use strict';

var fs = require('fs'),
    relative = require('path').relative;


var rfs = Object.create(fs);

rfs.writeFileSync = function (path) {
  path = relative(process.cwd(), path);
  return fs.writeFileSync.apply(null, [path].concat([].slice.call(arguments, 1)));
};

module.exports = rfs;
