define("states/<%=nameCamel%>", ["app", "controllers/<%=nameCamel%>"], function (app) {
	return app.config(["$stateProvider", function ($stateProvider) {
		$stateProvider.state("<%=nameCamel%>", {
//			"abstract": true,
//			parent: "parentState",
			url: "/{someProp}{anotherProp:(?:/[^/]+)?}",
			//  template: "<div></div>",
			//  templateProvider: function ($stateParams) { },
			templateUrl: "/view/<%=nameDash%>",
			controller: "<%=nameCamel%>"/*,*/
//			views: {
//				"view1@": {
//					  template: "<div></div>",
//					  templateProvider: function ($stateParams) { },
//					templateUrl: "template.html",
//					controller: "controllerName"
//				}
//			}
		});
	}]);
});