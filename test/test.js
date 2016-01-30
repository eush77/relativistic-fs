'use strict';

var rfs = require('..');

var test = require('tape'),
    sinon = require('sinon');

var fs = require('fs'),
    path = require('path');


var data = {
  absolutePath: path.resolve(__filename),
  relativePath: path.relative(process.cwd(), __filename),
  data: path.resolve(__filename), // Try to fool naive string-sniffing approach.
  options: { encoding: 'utf8' },
  callback: sinon.stub().throws(),
  result: Object()
};


test('writeFileSync', function (t) {
  var stub = sinon.stub(fs, 'writeFileSync').returns(data.result);
  var result = rfs.writeFileSync(data.absolutePath, data.data, data.options);

  t.true(stub.calledOnce, 'should call fs function only once');
  t.true(stub.calledWithExactly(data.relativePath, data.data, data.options),
         'should modify path arguments');
  t.equal(result, data.result, 'should pass the result through');
  t.end();

  stub.restore();
});
