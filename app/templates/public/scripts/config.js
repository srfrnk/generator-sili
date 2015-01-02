(function () {
    "use strict";

    require.config({
        baseUrl: __webApp_ResourceRoot + "/scripts",
        deps: ["bootstrap"],
        paths: {
            'domReady': __webApp_ResourceRoot + "/requirejs-domready/domReady"
        }
    });
    define("bootstrap", [
        "app",
        "states/main"/*client-state:,<%='\n\t'%>"states/<%=nameCamel%>"*/
    ], function () {
        "use strict";
        require(['domReady!'], function (document) {
            angular.bootstrap(document, ["app"]);
        });
    });
})();
