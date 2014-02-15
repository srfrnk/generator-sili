define("states/main", ["app","controllers/main"], function (app) {
	return app.config(["$stateProvider", function ($stateProvider) {
		$stateProvider.state("main", {
			url: "/",
			templateUrl: "/"+__webApp_ResourceVersion+"/view/main",
			controller: "main"
		});
	}]);
});