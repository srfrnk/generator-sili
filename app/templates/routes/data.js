require("requirejs").define("routes/data", ["models/mongooseHelper"], function (mongooseHelper) {
		var actions = {
			create: function (req, res) {
				/*var model = new myModel.MyModel(req.body);
				model.createdAt = new Date();
				model.save(function (err) {
					if (err) {
						res.send({error: err});
					}
					else {
						res.send({id: model._id});
					}
				});*/
			},
			getAll: function (req, res) {
				/*myModel.MyModel.find().select("-_id name description comments").exec(function (err,results) {
					res.send(results);
				})*/
			}
		};
		return function (req, res) {
			if(!mongooseHelper.isConnected())
			{
				res.send(500,"Db not connected!");
				return;
			}
			var action = actions[req.params.action];
			action(req, res);
		}
	}
);
