require.config({
	baseUrl: "/scripts",
	deps: ["bootstrap"],
	paths: {
		'domReady': '/requirejs-domready/domReady'
	}
});
define("bootstrap", [
	"app",
	"states/main"/*client-state:,<%='\n\t'%>"states/<%=nameCamel%>"*/
], function () {
	require(['domReady!'], function (document) {
		angular.bootstrap(document, ["app"]);
	});
});

