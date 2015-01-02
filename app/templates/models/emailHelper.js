require("requirejs").define("models/emailHelper", [], function () {
    "use strict";
	var Q = require("q");
	var emailjs = require("emailjs");
	var ejs = require('ejs');
	var fs = require('fs');
	var path = require('path');

	return {
		send: function (templatePath,data,to,subject) {
			var q= Q.defer();

			var server = emailjs.server.connect(JSON.parse(process.env.EMAILJS_CONNECTION_OPTIONS));

			var str = fs.readFileSync(path.join(process.env.rootPath, templatePath), 'utf8');
			var html = ejs.render(str, data);

			server.send({
				text: "",
				from: "noreply@gmail.com <noreply@gmail.com>",
				to: to,
				subject: subject,
				attachment: [
					{data: html, alternative: true}
				]
			}, function (err, message) {
				if (!err) {
					q.resolve(message);
				}
				else {
					console.log(err);
					q.reject(err);
				}
			});

			return q.promise;
		}

	};
});
