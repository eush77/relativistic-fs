'use strict';

var catalog = require('./lib/catalog'),
    types = require('./lib/types'),
    install = require('./lib/install');

var fs = require('fs'),
    relative = require('path').relative;


var rfs = Object.create(fs);

Object.keys(catalog).forEach(function (funcName) {
  var argTypes = catalog[funcName];

  rfs[funcName] = function () {
    var args = [].map.call(arguments, function (arg, index) {
      switch (argTypes[index]) {
        case types.path:
          return relative(process.cwd(), arg);

        case types.file:
          return isFd(arg) ? arg : relative(process.cwd(), arg);

        default:
          return arg;
      }
    });
    return fs[funcName].apply(this, args);
  };
});


// Copied from Node's source.
function isFd (path) {
  return (path >>> 0) === path;
}


module.exports = rfs;
module.exports.install = install;
