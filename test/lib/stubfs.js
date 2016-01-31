'use strict';

var catalog = require('../../lib/catalog'),
    data = require('./data');

var sinon = require('sinon');

var fs = require('fs');


Object.keys(catalog).forEach(function (funcName) {
  sinon.stub(fs, funcName).returns(data.result);
});

module.exports = fs;
