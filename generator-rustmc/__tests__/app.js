'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-rustmc:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      moduleName: 'test_example',
      commandName: 'test-example',
      githubUsername: 'test',
      website: 'example.com'
    });
  });

  it('creates files', () => {
    assert.file([path.join('src', 'main.rs')]);
  });
});
