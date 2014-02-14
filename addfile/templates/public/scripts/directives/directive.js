define("directives/<%=nameCamel%>", ["app"], function (app) {
	return app.directive('<%=nameCamel%>', [function () {
		return {
//			restrict: "EA",
//			transclude: true,
//			template:"",
//			replace: true,
//			scope: {
//				prop1: "=?",
//				prop2: "=",
//				prop3: "@",
//				event:"&"
//			},
//			templateUrl:"",
//			controller: ["$scope", "$element", "$attrs", "$transclude", function ($scope, $element, $attrs, $transclude) {
//			}],
			// require: 'ngModel',
			link: function (scope, elm, attrs/*, ngModel*/) {
				var <%=nameCamel%>=attrs.<%=nameCamel%>;
			}
		};
	}]);
});
