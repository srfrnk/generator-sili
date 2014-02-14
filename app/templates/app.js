var requirejs = require("requirejs");

requirejs.config({ deps: ["app"]})

requirejs.define("app", ["routes/index", "routes/login", "routes/view","routes/data"/*server-route:,"routes/<%=nameCamel%>"*/,"models/mongooseHelper"], function (indexRoute, loginRoute,viewRoute,dataRoute/*server-route:,"<%=nameCamel%>Route"*/) {
	/**
	 * Module dependencies.
	 */

	var express = require('express');
	var http = require('http');
	var path = require('path');

	var app = express();

// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('YourSessionKey'));
	app.use(express.session());
	app.use(require('stylus').middleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'bower_components')));
	app.use(express.static(path.join(__dirname, 'components')));
	app.use(app.router);

// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	app.get('/view/:name', viewRoute);
	app.all('/data/:action', dataRoute);
	app.get('/*', indexRoute);
	/*server-route:app.get('set_url_here', <%=nameCamel%>Route);<%='\n\t'%>*/

	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});
});
