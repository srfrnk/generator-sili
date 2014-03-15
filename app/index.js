'use strict';
var util = require('util');
var path = require('path');
//var fs = require('fs.extra');
var yeoman = require('yeoman-generator');
//var gift = require('gift');
var packageJson = require('../package.json');

var SiLiGenerator = module.exports = function SiLiGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});
};

util.inherits(SiLiGenerator, yeoman.generators.Base);

SiLiGenerator.prototype.app = function app() {
	this.projectName=path.basename(this.dest._base);
	this.webAppVersion=packageJson.version;
	this.directory("", "");
};


