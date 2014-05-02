require("requirejs").define("models/sqlServerHelper", [], function () {
	var Q = require("q");
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	var Enum = require("linq");

	var sqlServerHelper = {
		connect: function () {
			var connectDefer = Q.defer();

			var connectionOptions = JSON.parse(process.env.CONNECTION_OPTIONS) || {
				userName: "",
				password: "",
				server: "",
				options: {
					port:"",
					instanceName:"",
					database: ""
				}
			};

			var connection = new Connection(connectionOptions);

			connection.on('connect', function (err) {
				if (!!err) {
					console.log(err);
					connectDefer.reject(err);
				}
				else {
					connectDefer.resolve({
						connection: connection,
						request: function (query, options) {
							return sqlServerHelper.request(connection, query, options);
						},
						spRequest: function (spName, spParams, options) {
							return sqlServerHelper.spRequest(connection, spName, spParams, options);
						}
					});
				}
			});
			return connectDefer.promise;
		},
		request: function (connection, query, options) {
			var requestDefer = Q.defer();
			var rows = [];
			options = options || {};
			options.consolidate = options.consolidate || false;
			options.objectify = options.objectify || false;

			var request = new Request(query, function (err, rowCount) {
				if (err) {
					console.log(err);
					requestDefer.reject(err);
				} else {
					if (options.consolidate) {
						var rowData = rows;
						if (options.objectify) {
							rowData = sqlServerHelper.rowsToObjects(rows);
						}
						requestDefer.resolve(rowData);
					}
					else {
						requestDefer.resolve(rowCount);
					}
				}
			});

			request.on('row', function (columns) {
				if (options.consolidate) {
					rows.push(columns);
				}
				else {
					if (options.objectify) {
						columns = sqlServerHelper.rowToObj(columns);
					}
					requestDefer.notify(columns);
				}
			});

			connection.execSql(request);

			return requestDefer.promise;
		},
		sqlStringEncode: function (value) {
			return "N'"+
				value.toString().replace(/'/g,"''")+
				"'";
		},
		sqlValueString: function (value) {
			switch (typeof value) {
				case "number":
					return value.toString();
				case "string":
					return sqlServerHelper.sqlStringEncode(value);
				case "boolean":
					return value ? "true" : "false";
				case "object":
					if (value instanceof Date) {
						return sqlServerHelper.sqlStringEncode(value.toISOString());
					}
					else {
						return sqlServerHelper.sqlStringEncode(value);
					}
			}
		},
		spRequest: function (connection, spName, spParams, options) {
			var query = "EXEC " + spName + " "+Enum.from(spParams).select(function (param) {
				return "@" + param.key + "=" + sqlServerHelper.sqlValueString(param.value)
			}).toArray().join(",");
			return sqlServerHelper.request(connection, query, options);
		},
		rowToObj: function (rowColumns) {
			var item = {};
			rowColumns.forEach(function (column) {
				item[column.metadata.colName] = column.value;
			});
			return item;
		},
		rowsToObjects: function (rows) {
			return Enum.from(rows).select(function (row) {
				return sqlServerHelper.rowToObj(row);
			});
		}
	};
	return sqlServerHelper;
});