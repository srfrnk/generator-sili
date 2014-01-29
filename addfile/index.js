'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var url = require('url');

var AddfileGenerator = module.exports = function AddfileGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	this.argument('side', { type: String, required: false });
	this.argument('spec', { type: String, required: false });
	this.argument('name', { type: String, required: false });
};

util.inherits(AddfileGenerator, yeoman.generators.Base);

AddfileGenerator.prototype.getSpec = function getSpec() {
	/*
	 if (!this.spec) {
	 var cb = this.async();

	 var prompts = [
	 {
	 type: 'confirm',
	 name: 'someOption',
	 message: 'Would you like to enable this option?',
	 default: true
	 }
	 ];

	 this.prompt(prompts, function (props) {
	 this.someOption = props.someOption;

	 cb();
	 }.bind(this));
	 }
	 */

	this.name = this._.slugify(this.name);
}

AddfileGenerator.prototype.addFile = function addFile() {
	console.log('Adding ', this.side, 'file ', this.spec, ' of type:', this.name, '.');
	var action = this.side + '-' + this.spec;
	var cb = this.async();
	this._actions[action].call(this, cb);
};

AddfileGenerator.prototype._getFile = function _getFile(sourceUrl, destination, cb) {
	console.log('Getting latest ', destination, 'from github...');
	var pathname = url.parse(sourceUrl).pathname;
	var fileName = path.basename(pathname);
	var cache = path.join(this.cacheRoot(), pathname);
	rimraf(cache, function (err) {
		if (err) {
			console.log(err);
			cb(err);
		}
		else {
			this.fetch(sourceUrl, cache, function () {
				console.log('Building ', destination, '...');
				var body = this.engine(this.read(path.join(cache, fileName)), this);
				this.write(destination, body);
				cb();
			}.bind(this));
		}
	}.bind(this));
};

AddfileGenerator.prototype._actions = {
	"server-route": function (cb) {
		this._getFile("https://raw.github.com/srfrnk/WebApp/master/routes/_template.js", "routes/" + this.name + ".js", function () {
			cb();
			console.log("Done!");
		});
	}
};
