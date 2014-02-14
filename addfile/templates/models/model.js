require("requirejs").define("models/<%=nameCamel%>", ["models/mongooseHelper"], function (mongooseHelper) {
	var <%=nameCamel%>Schema, <%=nameCapital%>Model,<%=nameCamel%>Model={};
	mongooseHelper.connected.then(function () {
		<%=nameCamel%>Schema = mongooseHelper.mongoose.Schema({
			name: String,
			description: String,
			comments: String,
			createdAt: Date
		});
		<%=nameCapital%>Model = mongooseHelper.mongoose.model(" <%=nameCapital%>Model",  <%=nameCamel%>Schema);
		 <%=nameCamel%>Model. <%=nameCapital%>Model= <%=nameCapital%>Model;
	});
	return myModel;
});
