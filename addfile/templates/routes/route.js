require("requirejs").define("routes/<%=nameCamel%>", [], function () {
	return function (req, res,next) {
		res.send("");
		next();
	}
});
