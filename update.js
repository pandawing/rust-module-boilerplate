const rimraf = require('rimraf');
const pify = require('pify');
const path = require('path');
const copy = require('copy-concurrently');
const uniqueString = require('unique-string');
const tempDir = require('temp-dir');
const move = require('move-concurrently');
const globby = require('globby');

const getPath = () => path.join(tempDir, uniqueString());

let tempDest = getPath();
console.log(tempDest);
let copyDest = path.join('generator-rustmc', 'generators', 'app', 'templates');
Promise.resolve().then(() => {
  return copy('cli-boilerplate', tempDest);
}).then(() => {
  console.log(`copied to ${tempDest}`);
  return pify(rimraf)(copyDest);
}).then(() => {
  console.log(`removed ${copyDest}`);
  return move(path.join(tempDest, 'package.json'), path.join(tempDest, '_package.json'));
}).then(() => {
  return globby(['.*'], { cwd: tempDest });
}).then((value) => {
  console.log(value);
  return Promise.all(value.map((dotFile) => {
    return move(path.join(tempDest, dotFile), path.join(tempDest, dotFile.replace(/^./, '__')));
  }));
}).then(() => {
  return copy(tempDest, copyDest);
}).then(() => {
  console.log('completed');
}).catch(err => {
  console.error(err);
});
