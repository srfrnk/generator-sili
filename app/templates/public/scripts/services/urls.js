define("services/urls", ["app"], function (app) {
    "use strict";
	return app.factory("urls", ["$rootScope",
		function ($rootScope) {
			var urls = {
				resourceRoot: __webApp_ResourceRoot,
				resourceUrl: function (path) {
					return urls.resourceRoot + "/" + path;
				},
				urlTitle: function (title) {
					title=title.toLowerCase();
					title=title.replace(/\/?<\w+>/g,"-");
					title=title.replace("&amp;","-and-");
					title=title.replace(/[^0-9a-zA-Z\-]+/g,"-");
					title=title.replace(/\-+/g,"-");
					title=title.replace(/^-|-$/g,"");
					return title;
				}
			};
			angular.extend($rootScope,urls);
			return  urls;
		}
	]);
});
