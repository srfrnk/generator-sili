require("requirejs").define("models/elasticsearchHelper", [], function () {
		var Q = require("q");
		var ElasticSearchClient = require("elasticsearchclient");

		var serverOptions = JSON.parse(process.env.ES_SERVER_OPTIONS || "null") || {
			host: "",
			port: 443,
			secure: true,
			auth: {
				username: "",
				password: ""
			}
		};

		var elasticSearchClient = new ElasticSearchClient(serverOptions);

		return {
			client: elasticSearchClient,
			search: function (index, type, query,from,size) {
				var defer = Q.defer();
				elasticSearchClient.search(index, type, {
					"query": {
						"query_string": {
							"query": query
						}
					}
				},{from:from,size:size}).on('data', function (data) {
					defer.resolve(JSON.parse(data));
				}).on('error', function (error) {
					console.log(error);
					defer.reject(error);
				}).exec();
				return defer.promise;
			},
			update: function (index, type, document, id) {
				var defer = Q.defer();
				elasticSearchClient.deleteDocument(index, type, id).on('data', function (data) {
					elasticSearchClient.index(index, type, document, id)
						.on('data', function (data) {
							defer.resolve(JSON.parse(data));
						}).on('error', function (error) {
							console.log(error);
							defer.reject(error);
						}).exec();
				}).on('error', function (error) {
					console.log(error);
					defer.reject(error);
				}).exec();

				return defer.promise;
			}
		}
	}
);
