require("requirejs").define("routes/index", [], function () {
	return function (req, res) {
		var resourceVersion = req.application.get("packageJson").version;
		res.render("index.ejs", {resourceVersion: resourceVersion,resourceRoot: "/"+resourceVersion});
	}
});
