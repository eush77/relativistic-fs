'use strict';

var catalog = require('./lib/catalog'),
    types = require('./lib/types');

var fs = require('fs'),
    relative = require('path').relative;


var rfs = Object.create(fs);

Object.keys(catalog).forEach(function (funcName) {
  var argTypes = catalog[funcName];

  rfs[funcName] = function () {
    var args = [].map.call(arguments, function (arg, index) {
      return (argTypes[index] === types.path)
        ? relative(process.cwd(), arg)
        : arg;
    });
    return fs[funcName].apply(this, args);
  };
});

module.exports = rfs;
