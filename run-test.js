const spawn = require('cross-spawn');
const process = require('process');

const packages = [
  'generator-rustm',
  'generator-rustmc',
];

packages.forEach((package) => {
  const resultInstall = spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: package });
  if (resultInstall.status != 0) {
    process.exit(resultInstall.status);
  }
  const resultTest = spawn.sync('npm', ['test'], { stdio: 'inherit', cwd: package });
  if (resultTest.status != 0) {
    process.exit(resultTest.status);
  }
});
