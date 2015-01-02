require("requirejs").define("routes/login", [], function () {
        "use strict";
		return function (req, res) {
			res.send("login");
		}
	}
);
