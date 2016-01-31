'use strict';

var types = require('./types'),
    Path = types.path,
    Buffer = types.buffer,
    Options = types.options,
    Callback = types.callback;


module.exports = {
  writeFileSync: [Path, Buffer, Options]
};
