'use strict';

var rfs = require('..'),
    catalog = require('../lib/catalog'),
    data = require('./lib/data'),
    types = require('../lib/types');

var test = require('tape'),
    sinon = require('sinon');

var fs = require('fs');


Object.keys(catalog).forEach(function (funcName) {
  var argTypes = catalog[funcName];

  var hasFileArg = argTypes.some(function (type) {
    return type === types.file;
  });

  if (hasFileArg) {
    test(funcName, testWithArgsTypes(argTypes.map(function (type) {
      return (type === types.file) ? types.path : type;
    })));

    test(funcName + ' (with fd)', testWithArgsTypes(argTypes.map(function (type) {
      return (type === types.file) ? types.fd : type;
    })));
  }
  else {
    test(funcName, testWithArgsTypes(argTypes));
  }

  function testWithArgsTypes (argTypes) {
    return function (t) {
      var stub = sinon.stub(fs, funcName).returns(data.result);
      var result = rfs[funcName].apply(data.this, data.inputArgs(argTypes));
      stub.restore();

      t.true(stub.calledOnce, 'should call fs function only once');
      t.true(stub.calledOn(data.this), 'should call in the same context');
      t.true(stub.calledWithExactly.apply(stub, data.outputArgs(argTypes)),
             'should modify path arguments');
      t.equal(result, data.result, 'should pass the result through');
      t.end();
    };
  }
});


test('delegates everything else to fs', function (t) {
  t.equal(rfs.ReadStream, fs.ReadStream, 'ReadStream');
  t.equal(rfs.WriteStream, fs.WriteStream, 'WriteStream');
  t.equal(rfs.Stats, fs.Stats, 'Stats');
  t.equal(rfs.FSWatcher, fs.FSWatcher, 'FSWatcher');

  t.equal(rfs.F_OK, fs.F_OK, 'F_OK');
  t.equal(rfs.R_OK, fs.R_OK, 'R_OK');
  t.equal(rfs.W_OK, fs.W_OK, 'W_OK');
  t.equal(rfs.X_OK, fs.X_OK, 'X_OK');

  t.equal(rfs.close, fs.close, 'close');
  t.equal(rfs.closeSync, fs.closeSync, 'closeSync');
  t.equal(rfs.read, fs.read, 'read');
  t.equal(rfs.readSync, fs.readSync, 'readSync');

  t.end();
});
