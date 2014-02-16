var requirejs = require("requirejs");

requirejs.config({ deps: ["app"]})

requirejs.define("app", ["routes/index", "routes/login", "routes/view","routes/data"/*server-route:,"routes/<%=nameCamel%>"*/,"models/mongooseHelper"], function (indexRoute, loginRoute,viewRoute,dataRoute/*server-route:,"<%=nameCamel%>Route"*/) {
	/**
	 * Module dependencies.
	 */

	var express = require('express');
	var http = require('http');
	var path = require('path');

var packageJson = require("./package.json");

	var app = express();

// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
app.set('packageJson',packageJson);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('YourSessionKey'));
	app.use(express.session());
	app.use("/"+packageJson.version,require('stylus').middleware(path.join(__dirname, 'public')));
	app.use("/"+packageJson.version,express.static(path.join(__dirname, 'public')));
	app.use("/"+packageJson.version,express.static(path.join(__dirname, 'bower_components')));
	app.use("/"+packageJson.version,express.static(path.join(__dirname, 'components')));
	app.use(function (req, res, next) {
		req.application=app;
		next();
	});
	app.use(app.router);

// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	app.get("/"+packageJson.version+"/view/:name", viewRoute);
		app.all("/"+packageJson.version+"/data/:action", dataRoute);
	app.get('/*', indexRoute);
	/*server-route:app.get('set_url_here', <%=nameCamel%>Route);<%='\n\t'%>*/

	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});
});
