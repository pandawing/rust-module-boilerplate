'use strict';
const _s = require('underscore.string');

exports.slugifyPackageName = name => _s.slugify(name);
exports.underscoredPackageName = name => _s.underscored(name);
