'use strict';

var rfs = require('..');

var test = require('tape');

var fs = require('fs');


test('install', function (t) {
  t.equal(rfs.install(), rfs, 'should return rfs');
  t.equal(require('fs'), rfs, 'should replace an entry in require.cache');
  t.ok(typeof require('fs').readFileSync == 'function',
       'should indeed work like fs');
  t.notEqual(require('fs').readFileSync, fs.readFileSync,
             'should not modify the core object itself');

  delete require.cache.fs;
  rfs.install();

  t.equal(require('fs'), rfs,
          'should add an entry to require.cache if it isn\'t there');
  t.end();
});
