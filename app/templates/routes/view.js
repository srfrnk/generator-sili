require("requirejs").define("routes/view", [], function () {
		return function (req, res) {
			res.render(req.params.name+".ejs");
		}
	}
);
