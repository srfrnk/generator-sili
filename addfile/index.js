'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var url = require('url');
var changeCase = require('change-case');

var AddfileGenerator = module.exports = function AddfileGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	this.argument('side', { type: String, required: false });
	this.argument('spec', { type: String, required: false });
	this.argument('name', { type: String, required: false });

	if (this.side == 's') {
		this.side = 'server';
	}
	else if (this.side == 'c') {
		this.side = 'client';
	}
};

util.inherits(AddfileGenerator, yeoman.generators.Base);

AddfileGenerator.prototype.getSide = function getSide() {
	if (!this.side) {
		var cb = this.async();

		var prompts = [
			{
				type: 'list',
				name: 'side',
				message: 'Server or Client side?',
				default: 'server',
				choices: [
					{value: 'server', name: 'Server'},
					{value: 'client', name: 'Client'}
				]
			}
		];

		this.prompt(prompts, function (props) {
			this.side = props.side;
			cb();
		}.bind(this));
	}
}

AddfileGenerator.prototype.getSpec = function getSpec() {
	if (!this.spec) {
		var cb = this.async();

		var prompts = [
			{
				type: 'list',
				name: 'spec',
				message: 'File type:',
				choices: this.side == 'server' ?
					[
						{ value: 'route', name: 'Route'},
						{ value: 'view', name: 'View'},
						{ value: 'model', name: 'Model'}
					] :
					[
						{ value: 'full-stack', name: 'Full Stack: State -> Controller -> View -> Stylesheet'},
						{ value: 'state', name: 'State'},
						{ value: 'controller', name: 'Controller'},
						{ value: 'service', name: 'Service'},
						{ value: 'directive', name: 'Directive'},
						{ value: 'filter', name: 'Filter'},
						{ value: 'i18n', name: 'Internationalization'},
						{ value: 'stylus', name: 'Stylus'}
					]
			}
		];
		this.prompt(prompts, function (props) {
			this.spec = props.spec;
			cb();
		}.bind(this));
	}
}

AddfileGenerator.prototype.getName = function getName() {
	if (!this.name) {
		var cb = this.async();

		var prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'New file name:',
				default: 'new'
			}
		];

		this.prompt(prompts, function (props) {
			this.name = props.name;
			cb();
		}.bind(this));
	}
}

AddfileGenerator.prototype.setParams = function setParams() {
	this.action = this.side + '-' + this.spec;

	this.path = path.dirname(this.name);
	this.name = path.basename(this.name, path.extname(this.name));

	var name = changeCase.sentenceCase(this.name);
	this.nameLower = changeCase.lowerCase(this.name);
	this.nameUpper = changeCase.upperCase(this.name);
	this.nameCamel = changeCase.camelCase(name);
	this.nameCapital = changeCase.pascalCase(name);
	this.nameDash = changeCase.paramCase(name);

	this.fullPath = path.join(this.path, this.nameCamel);
};

AddfileGenerator.prototype.addFile = function addFile() {
	var cb = this.async();
	this._runAction(this.action, cb);
};

AddfileGenerator.prototype._runAction = function _runAction(action,cb) {
	var prevAction=this.action;
	this.action=action;
	this._actions[action].call(this, function () {
		this.action=prevAction;
		cb();
	}.bind(this));
};

AddfileGenerator.prototype._getFile = function _getFile(src, destination, cb) {
	console.log('Building ', destination, '...');
	var body = this.engine(this.read(src), this);
	this.write(destination, body);
	if (!!cb) cb();
};

AddfileGenerator.prototype._updateFile = function _getFile(filepath, actionId) {
	var regexp = {
		".js": new RegExp("/\\*" + actionId + ":(.*?)\\*/", "mg"),
		".styl": new RegExp("", "mg"),
		".ejs": new RegExp("<!--" + actionId + ":(.*?)-->", "mg")
	};
	console.log('Updating ', filepath, "...");
	var ext = path.extname(filepath);
	var content = this.readFileAsString(filepath);
	var newContent = content.replace(regexp[ext], function (match, capture, idx, all) {
		capture = capture.replace(/\[\[%/g, "<%");
		var newContent = this.engine(capture, this);
		newContent=newContent.replace(/<\[%/g, "<%");
		return newContent + match;
	}.bind(this));

	this.write(filepath, newContent);
};

AddfileGenerator.prototype._actions = {
	"server-route": function (cb) {
		this._getFile("routes/route.js", "routes/" + this.fullPath + ".js", function () {
			this._updateFile("app.js", this.action);
			cb();
		}.bind(this));
	},
	"server-view": function (cb) {
		this._getFile("views/view.ejs", "views/" + this.fullPath + ".ejs", function () {
			cb();
		}.bind(this));
	},
	"server-model": function (cb) {
		this._getFile("models/model.js", "models/" + this.fullPath + ".js", function () {
			cb();
		}.bind(this));
	},
	"client-full-stack": function (cb) {
		this._runAction("client-state", function () {
			this._runAction("client-controller", function () {
				this._runAction("server-view", function () {
					this._runAction("client-stylus", function () {
						this.language="en-US";
						this._runAction("client-i18n", function () {
							cb();
						}.bind(this));
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},
	"client-state": function (cb) {
		this._getFile("public/scripts/states/state.js", "public/scripts/states/" + this.fullPath + ".js", function () {
			this._updateFile("public/scripts/config.js", this.action);
			cb();
		}.bind(this));
	},
	"client-controller": function (cb) {
		this._getFile("public/scripts/controllers/controller.js", "public/scripts/controllers/" + this.fullPath + ".js", function () {
			cb();
		}.bind(this));
	},
	"client-service": function (cb) {
		this._getFile("public/scripts/services/service.js", "public/scripts/services/" + this.fullPath + ".js", function () {
			cb();
		}.bind(this));
	},
	"client-directive": function (cb) {
		this._getFile("public/scripts/directives/directive.js", "public/scripts/directives/" + this.fullPath + ".js", function () {
			cb();
		}.bind(this));
	},
	"client-filter": function (cb) {
		this._getFile("public/scripts/filters/filter.js", "public/scripts/filters/" + this.fullPath + ".js", function () {
			cb();
		}.bind(this));
	},
	"client-i18n": function (cb) {
		var prompts = [
			{
				type: 'list',
				name: 'language',
				message: 'Select language:',
				choices: [
					{ value: 'en-US', name: 'English US'},
					{ value: 'en-UK', name: 'English UK'},
					{ value: 'he-IL', name: 'Hebrew'}
				]
			}
		];
		var createFile = function() {
			this._getFile("public/i18n/i18n.json", "public/i18n/" + this.language + "/" + this.fullPath + ".json", function () {
				cb();
			}.bind(this))
		}.bind(this);

		if (!this.language) {
			this.prompt(prompts, function (props) {
				this.language = props.language;
				createFile();
			}.bind(this));
		}
		else {
			createFile();
		}
	},
	"client-stylus": function (cb) {
		this._getFile("public/stylesheets/stylesheet.styl", "public/stylesheets/" + this.fullPath + ".styl", function () {
			this._updateFile("views/index.ejs", this.action);
			cb();
		}.bind(this));
	}
};
