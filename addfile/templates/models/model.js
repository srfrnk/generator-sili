require("requirejs").define("models/<%=nameCamel%>", ["models/mongooseHelper"], function (mongooseHelper) {
	var <%=nameCamel%>Schema,<%=nameCapital%>Model,<%=nameCamel%>Model={};
	mongooseHelper.connected.then(function () {
        try {
		<%=nameCamel%>Schema = mongooseHelper.mongoose.Schema({
			name: String,
			description: String,
			comments: String,
			createdAt: Date
		});
		<%=nameCapital%>Model = mongooseHelper.mongoose.model("<%=nameCamel%>",<%=nameCamel%>Schema);
		 <%=nameCamel%>Model.<%=nameCapital%>Model = <%=nameCapital%>Model;
        }
        catch (e) {
            console.log(e, new Error().stack);
        }
	});
	return <%=nameCamel%>Model;
});
