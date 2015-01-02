require("requirejs").define("models/redisHelper", [], function () {
    "use strict";
	var Q = require("q");
	var redis = require("redis");
	var connectionOptions = JSON.parse(process.env.REDIS_CONNECTION_OPTIONS);
	var client = redis.createClient(connectionOptions.port, connectionOptions.host, {});
	client.auth(connectionOptions.password, function (err, reply) {
		if(!!err)
		{
			console.log(err);
		}
	});
	return {
		set: function (key, value) {
			client.set(key,value);
		},
		get: function (key) {
			var q= Q.defer();
			client.get(key, function (err, reply) {
				if(!err)
				{
					q.resolve(reply);
				}
				else
				{
					console.log(err);
					q.reject(err);
				}
			});

			return q.promise;
		},
		del: function (key) {
			var q= Q.defer();
			client.del(key, function (err, reply) {
				if(!err)
				{
					q.resolve(reply);
				}
				else
				{
					console.log(err);
					q.reject(err);
				}
			});

			return q.promise;
		},
		expire: function (key,maxAge) {
			client.expire(key,maxAge);
		}
	};
});
