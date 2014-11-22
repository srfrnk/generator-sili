define("controllers/<%=nameCamel%>", ["app"], function (app) {
	return app.controller("<%=nameCamel%>", ["$scope"/*,"$translate","$translatePartialLoader"*/, function ($scope/*,$translate,$translatePartialLoader*/) {
/*
		$translatePartialLoader.deletePart("<%=nameCamel%>",true);
		$translatePartialLoader.addPart("<%=nameCamel%>");
		$translate.refresh();
*/

		angular.extend($scope, {
		});
	}]);
});
