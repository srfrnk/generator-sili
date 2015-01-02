require("requirejs").define("routes/view", [], function () {
        "use strict";
		return function (req, res) {
			res.render(req.params.name+".ejs");
		}
	}
);
