define("app", [], function () {
	var app = angular.module("app", ["ngResource", "ui.router", "ui.bootstrap", "pascalprecht.translate","fundoo.services","googlechart","ngSocket"]);
	app.config(["$locationProvider","$translateProvider","$translatePartialLoaderProvider",function ($locationProvider,$translateProvider,$translatePartialLoaderProvider) {
		$locationProvider.html5Mode(true);
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: __webApp_ResourceRoot+"/i18n/{lang}/{part}.json"
		});
		$translateProvider.preferredLanguage('en-US');
	}]);
	app.run(["$rootScope","$translate","$translatePartialLoader",function ($rootScope, $translate,$translatePartialLoader) {
		$translatePartialLoader.addPart("global");
		$translate.refresh();
		$rootScope.pageTitleParams={};
	}]);
	return app;
});