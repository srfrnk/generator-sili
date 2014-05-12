define("directives/scrollPosition", ["app"], function (app) {
	app.directive('scrollPosition', ["$window",function ($window) {
		return {
			scope: {
				scroll: '=scrollPosition'
			},
			link: function (scope, element, attrs) {
				var windowEl = angular.element($window);
				var handler = function () {
					scope.scroll = windowEl.scrollTop();
				}
				windowEl.on('scroll', scope.$apply.bind(scope, handler));
				handler();
			}
		};
	}]);
});

