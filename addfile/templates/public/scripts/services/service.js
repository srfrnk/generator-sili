define("services/<%=nameCamel%>", ["app"], function (app) {
    "use strict";
	return app.factory("<%=nameCamel%>", ["$resource",
		function ($resource) {
			var service = $resource("/data_url/:action", {}, {
				create: {
					method: "POST",
					params: { action: "create" }
				},
				list: {
					method: "GET",
					params: { action: "list" },
					isArray:true
				}
			});
			return {
				create: function (<%=nameCamel%>,cb) {
					return service.create(<%=nameCamel%>,cb);
				},
				list: function (cb) {
					return service.list({},cb);
				}
			};
		}
	]);
});
