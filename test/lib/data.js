'use strict';

var types = require('../../lib/types');

var sinon = require('sinon');

var path = require('path');


var data = {
  result: Object(),
  this: Object(),
  absolutePath: path.resolve(__filename),
  relativePath: path.relative(process.cwd(), __filename),
  ordinary: {
    // Fool the naive string-sniffing approach.
    buffer: path.resolve(__filename),
    options: { encoding: 'utf8' },
    callback: sinon.stub().throws()
  }
};

exports.result = data.result;
exports.this = data.this;


var defaultArg = function (type) {
  if (type.typeName in data.ordinary) {
    return data.ordinary[type.typeName];
  }
  throw Error('Invalid type: ' + (type ? type.typeName : undefined));
};

exports.inputArgs = function (argTypes) {
  return argTypes.map(function (type) {
    return (type === types.path) ? data.absolutePath : defaultArg(type);
  });
};

exports.outputArgs = function (argTypes) {
  return argTypes.map(function (type) {
    return (type === types.path) ? data.relativePath : defaultArg(type);
  });
};
