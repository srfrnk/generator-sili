require("requirejs").define("middleware/<%=nameCamel%>", [], function () {
    return function (req, res, next) {
//        if(ok) {
        next();
//        }
//        else
//        {
        // next("route");
        // next(new Error("that\'s no good!"));
//        }
    };
});

