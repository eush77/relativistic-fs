[![npm](https://nodei.co/npm/relativistic-fs.png)](https://npmjs.com/package/relativistic-fs)

# relativistic-fs

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

[`fs`][fs] wrapper to force relative paths everywhere.

Useful when you want to restrict your Node application to a certain directory. Absolute paths [won't work][se-explanation] because of executable bits on all the top-level directories, for example:

```js
fs.readFileSync('/root/apps/my-fancy-app/foo/bar')
// Needs execute bit on:
//   - /
//   - /root
//   - /root/apps
//   - /root/apps/my-fancy-app
//   - /root/apps/my-fancy-app/foo
// Needs read bit on:
//   - /root/apps/my-fancy-app/foo/bar
```

With `relativistic-fs` (assuming `/root/apps/my-fancy-app` is the working directory):

```js
fs.readFileSync('/root/apps/my-fancy-app/foo/bar')  // translates to ./foo/bar
// Needs execute bit on:
//   - /root/apps/my-fancy-app
//   - /root/apps/my-fancy-app/foo
// Needs read bit on:
//   - /root/apps/my-fancy-app/foo/bar
```

See?

`relativistic-fs` can be applied on the top level of your application and all the modules (incl. dependencies) will just work even on the most stringent permission system (provided they don't genuinely need to access files they lack a permission to).

[fs]: https://nodejs.org/api/fs.html
[se-explanation]: http://unix.stackexchange.com/questions/13858/do-the-parent-directorys-permissions-matter-when-accessing-a-subdirectory/13891#13891

[travis]: https://travis-ci.org/eush77/relativistic-fs
[travis-badge]: https://travis-ci.org/eush77/relativistic-fs.svg?branch=master
[david]: https://david-dm.org/eush77/relativistic-fs
[david-badge]: https://david-dm.org/eush77/relativistic-fs.png

## API

### `rfs = require('relativistic-fs')`

`relativistic-fs` wraps all functions from the [core fs][fs] module and exports them under the same name and interface:

```js
rfs.readdir(__dirname, function (err, files) {
  // ...
});
```

### `rfs.install()`

Replace the core [fs] module with `relativistic-fs` so that any subsequent `require('fs')` calls return `rfs`. (Modifies [require.cache].)

[require.cache]: https://nodejs.org/api/globals.html#globals_require_cache

## What's up with the name?

[relative-fs] was already taken.

[relative-fs]: https://github.com/spenceralger/relative-fs

## Install

```
npm install relativistic-fs
```

## License

MIT
