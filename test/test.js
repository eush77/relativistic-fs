'use strict';

var stubFs = require('./lib/stubfs'),
    rfs = require('..'),
    catalog = require('../lib/catalog'),
    data = require('./lib/data');

var test = require('tape');


Object.keys(catalog).forEach(function (funcName) {
  var argTypes = catalog[funcName];
  var stub = stubFs[funcName];

  if (!stub.isSinonProxy) {
    throw Error('Function not stubbed: ' + funcName);
  }

  test(funcName, function (t) {
    var result = rfs[funcName].apply(data.this, data.inputArgs(argTypes));

    t.true(stub.calledOnce, 'should call fs function only once');
    t.true(stub.calledOn(data.this), 'should call in the same context');
    t.true(stub.calledWithExactly.apply(stub, data.outputArgs(argTypes)),
           'should modify path arguments');
    t.equal(result, data.result, 'should pass the result through');
    t.end();
  });
});
