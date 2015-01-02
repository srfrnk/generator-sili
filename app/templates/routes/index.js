require("requirejs").define("routes/index", [], function () {
    "use strict";
	return function (req, res) {
		var resourceVersion = req.application.get("packageJson").version;
		res.render("index.ejs", {resourceVersion: resourceVersion,resourceRoot: "/"+resourceVersion});
	}
});
