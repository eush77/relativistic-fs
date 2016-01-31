'use strict';


var type = function (name) {
  return {
    typeName: name
  };
};


module.exports = {
  path: type('path'),
  buffer: type('buffer'),
  number: type('number'),
  mode: type('mode'),
  flags: type('flags'),
  uid: type('uid'),
  symlinkType: type('symlinkType'),
  timestamp: type('timestamp'),
  options: type('options'),
  callback: type('callback')
};
