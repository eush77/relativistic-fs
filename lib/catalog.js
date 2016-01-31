'use strict';

var types = require('./types'),
    Path = types.path,
    File = types.file,
    Buffer = types.buffer,
    Number = types.number,
    Mode = types.mode,
    Flags = types.flags,
    Uid = types.uid,
    Gid = Uid,
    SymlinkType = types.symlinkType,
    Timestamp = types.timestamp,
    Options = types.options,
    Cache = Options,
    Callback = types.callback;

var fs = require('fs');


var catalog = {
  access: [Path, Mode, Callback],
  accessSync: [Path, Mode],
  appendFile: [File, Buffer, Options, Callback],
  appendFileSync: [File, Buffer, Options],
  chmod: [Path, Mode, Callback],
  chmodSync: [Path, Mode],
  chown: [Path, Uid, Gid, Callback],
  chownSync: [Path, Uid, Gid],
  createReadStream: [Path, Options],
  createWriteStream: [Path, Options],
  exists: [Path, Callback],
  existsSync: [Path],
  lchmod: [Path, Mode, Callback],
  lchmodSync: [Path, Mode],
  lchown: [Path, Uid, Gid, Callback],
  lchownSync: [Path, Uid, Gid],
  link: [Path, Path, Callback],
  linkSync: [Path, Path],
  lstat: [Path, Callback],
  lstatSync: [Path],
  mkdir: [Path, Mode, Callback],
  mkdirSync: [Path, Mode],
  open: [Path, Flags, Mode, Callback],
  openSync: [Path, Flags, Mode],
  readFile: [File, Options, Callback],
  readFileSync: [File, Options],
  readdir: [Path, Callback],
  readdirSync: [Path],
  readlink: [Path, Callback],
  readlinkSync: [Path],
  realpath: [Path, Cache, Callback],
  realpathSync: [Path, Cache],
  rename: [Path, Path, Callback],
  renameSync: [Path, Path],
  rmdir: [Path, Callback],
  rmdirSync: [Path],
  stat: [Path, Callback],
  statSync: [Path],
  symlink: [Path, Path, SymlinkType, Callback],
  symlinkSync: [Path, Path, SymlinkType],
  truncate: [Path, Number, Callback],
  truncateSync: [Path, Number],
  unlink: [Path, Callback],
  unlinkSync: [Path],
  unwatchFile: [Path, Callback],
  utimes: [Path, Timestamp, Timestamp, Callback],
  utimesSync: [Path, Timestamp, Timestamp],
  watch: [Path, Options, Callback],
  watchFile: [Path, Options, Callback],
  writeFile: [File, Buffer, Options, Callback],
  writeFileSync: [File, Buffer, Options]
};


Object.keys(catalog).forEach(function (funcName) {
  if (typeof fs[funcName] != 'function') {
    // Not every function is available on every platform.
    delete catalog[funcName];
  }
});


module.exports = catalog;
