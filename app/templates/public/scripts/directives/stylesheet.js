define("directives/stylesheet", ["app","services/urls"], function (app) {
	return app.directive('stylesheet', ["urls",function (urls) {
		return {
			restrict: "E",
			template:'',
			replace: true,
			scope: {
				path: "@"
			},
			link: function (scope, elm, attrs) {
				var e=$('<link rel="stylesheet" type="text/css" href="'+urls.resourceUrl('stylesheets/'+scope.path)+'"/>');
				$(elm).replaceWith(e);
			}
		};
	}]);
});
