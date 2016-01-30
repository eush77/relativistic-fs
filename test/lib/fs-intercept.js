'use strict';

var events = require('events'),
    fs = require('fs');


module.exports = function () {
  var ee = new events;

  // Replace `fs` module with EventEmitter for testing.
  var fakeFs = Object.keys(fs).reduce(function (fakeFs, methodName) {
    if (typeof fs[methodName] == 'function') {
      fakeFs[methodName] = function () {
        ee.emit.apply(ee, [methodName].concat([].slice.call(arguments)));
      };
    }
    return fakeFs;
  }, {});

  require.cache['fs'] = { exports: fakeFs };

  return ee;
};
