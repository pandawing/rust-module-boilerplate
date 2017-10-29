const rimraf = require('rimraf');
const pify = require('pify');
const path = require('path');
const copy = require('copy-concurrently');
const uniqueString = require('unique-string');
const tempDir = require('temp-dir');

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
  return copy(tempDest, copyDest);
}).then(() => {
  console.log('completed');
}).catch(err => {
  console.error(err);
});
