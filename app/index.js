'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs.extra');
var yeoman = require('yeoman-generator');
var gift = require('gift');

var SrfrnkWebappGenerator = module.exports = function SrfrnkWebappGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SrfrnkWebappGenerator, yeoman.generators.Base);

/*SrfrnkWebappGenerator.prototype.askFor = function askFor() {
 var cb = this.async();

 // have Yeoman greet the user.
 console.log(this.yeoman);

 var prompts = [{
 type: 'confirm',
 name: 'someOption',
 message: 'Would you like to enable this option?',
 default: true
 }];

 this.prompt(prompts, function (props) {
 this.someOption = props.someOption;

 cb();
 }.bind(this));
 }*/
;

/*
 SrfrnkWebappGenerator.prototype.app = function app() {
 this.mkdir('app');
 this.mkdir('app/templates');

 this.copy('_package.json', 'package.json');
 this.copy('_bower.json', 'bower.json');
 };
 */

/*
 SrfrnkWebappGenerator.prototype.projectfiles = function projectfiles() {
 this.copy('editorconfig', '.editorconfig');
 this.copy('jshintrc', '.jshintrc');
 };
 */

SrfrnkWebappGenerator.prototype.cloneGit = function cloneGit() {
	var cb = this.async();
	gift.clone("https://github.com/srfrnk/WebApp.git", "", function () {
		fs.copyRecursive(this.destinationRoot() + "/WebApp", this.destinationRoot(), function () {
			fs.rmrf(this.destinationRoot() + "/WebApp", function () {
				cb();
			}.bind(this));
		}.bind(this));
	}.bind(this));
};