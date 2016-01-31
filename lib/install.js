'use strict';


module.exports = function install () {
  var rfs = require('..');
  require.cache.fs = require.cache[require.resolve('..')];
  return rfs;
};
