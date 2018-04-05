# Promise
## Simple Promise JavaScript Polyfill

Just another promise polyfill for javascript.
Optimized for embedded systems. But usable everywhere, probably.

### Description
This is a simple polyfill for the ES6 feature [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The goal of this project is to bring the promise feature to older javascript versions.
Especally to embedded systems. For javascript engines without a browser.
But you can also use this in browser and node js.
This is optimized for the QT Script Engine (obsolete JavaScript Engine) on embedded systems.
For this reason no browser api are integrated.
For issues and pull-requests please keep in mind that goal.

Some features of this promise library are not supported.
One of the missing feature is a unhandled rejection detection.
Also the behaviors and object data may different from the native feature. But it should work as expected.
This software is provided without warranty of any kind.

### Usage Example
```js
function getState() {
  console.log('Loading state...');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('Done! After 2 seconds.');
    }, 2000);
  });
}

getState().then(function (value) {
  console.log(value);
});
```
Expected result on console:
```
Loading state...
Done! After 2 seconds.
```

For node-js use:
´´´js
var Promise = require('./promise').Promise;
´´´
But node-js and modern browsers supports natively the Promise feature. You don't need this library.
IE is not tested and not official supported. But it should work. Just try it.

### Build

You need gulp-cli (global).

Once install all dependencies:
```bash
npm i
```

Compile:
```bash
npm run build
```

### NPM Package
[planned] Currently this library is not available as npm package.
You have to download the dist/promise.js file and include it to your project manually.

### License
Apache-2.0
see LICENSE file for more information.

(C) 2018 Dominik Geng
