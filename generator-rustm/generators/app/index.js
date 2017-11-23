'use strict';
const superb = require('superb');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const Generator = require('yeoman-generator');
const _s = require('underscore.string');

module.exports = class extends Generator {
  constructor(a, b) {
    super(a, b);

    this.option('org', {
      type: 'string',
      desc: 'Publish to a GitHub organization account'
    });
  }

  init() {
    return this.prompt([
      {
        name: 'moduleName',
        message: 'What do you want to name your module?',
        default: _s.slugify(this.appname)
      },
      {
        name: 'directoryName',
        message: 'What do you want to name your directory?',
        default: _s.slugify(this.appname)
      },
      {
        name: 'moduleDescription',
        message: 'What is your module description?',
        default: `My ${superb()} module`
      },
      {
        name: 'githubUsername',
        message: 'What is your GitHub username?',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide a username'),
        when: () => !this.options.org
      },
      {
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide a website URL'),
        filter: x => normalizeUrl(x)
      }
    ]).then(props => {
      const tpl = {
        moduleName: props.moduleName,
        externCrateModuleName: _s.underscored(props.moduleName),
        moduleDescription: props.moduleDescription,
        camelModuleName: _s.camelize(props.moduleName),
        githubUsername: this.options.org || props.githubUsername,
        directoryName: props.directoryName,
        appveyorDirectoryName: _s.dasherize(props.directoryName),
        name: this.user.git.name(),
        email: this.user.git.email(),
        website: props.website,
        humanizedWebsite: humanizeUrl(props.website)
      };

      const mv = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to));
      };

      this.fs.copyTpl([`${this.templatePath()}/**`], this.destinationPath(), tpl);

      mv('__appveyor.yml', '.appveyor.yml');
      mv('__conventional-changelog.context.js', '.conventional-changelog.context.js');
      mv('__gitignore', '.gitignore');
      mv('__travis.yml', '.travis.yml');
      mv('_package.json', 'package.json');
    });
  }
  git() {
    this.spawnCommandSync('git', ['init']);
  }
  install() {
    this.installDependencies({ bower: false });
  }
};
