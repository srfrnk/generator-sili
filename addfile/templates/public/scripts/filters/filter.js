define("filters/<%=nameCamel%>", ["app"], function (app) {
    /*
        Usage:
            {{ input | filter-name:arg1:arg2 }}

    */
	return app.filter("<%=nameCamel%>",[function () {
		return function (input, arg1,arg2) {
			return input+":"+arg1;
		};
	}]);
});