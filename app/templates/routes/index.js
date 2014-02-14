require("requirejs").define("routes/index", [], function () {
	return function (req, res) {
		res.render("index.ejs");
	}
});
