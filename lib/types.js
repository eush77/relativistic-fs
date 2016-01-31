'use strict';


var type = function (name) {
  return {
    typeName: name
  };
};


module.exports = {
  path: type('path'),
  buffer: type('buffer'),
  options: type('options'),
  callback: type('callback')
};
