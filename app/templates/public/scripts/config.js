require.config({
	baseUrl: "/"+__webApp_ResourceVersion+"/scripts",
	deps: ["bootstrap"],
	paths: {
		'domReady': "/"+__webApp_ResourceVersion+"/requirejs-domready/domReady"
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

