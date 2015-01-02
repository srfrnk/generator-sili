require("requirejs").define("routes/<%=nameCamel%>", [], function () {
    "use strict";
	return function (req, res,next) {
		res.send("");
		next();
	}
});
