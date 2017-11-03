'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-rustmc:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com'
    });
  });

  it('creates files', () => {
    assert.file([path.join('src', 'main.rs')]);
  });
});
