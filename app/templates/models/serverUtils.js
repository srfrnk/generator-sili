require("requirejs").define("models/serverUtils", [], function () {
    "use strict";
    return {
        getClientIp: function (req) {
            // snippet taken from http://catapulty.tumblr.com/post/8303749793/heroku-and-node-js-how-to-get-the-client-ip-address
            var ipAddress;
            // The request may be forwarded from local web server.
            var forwardedIpsStr = req.header('x-forwarded-for');
            if (forwardedIpsStr) {
                // 'x-forwarded-for' header may return multiple IP addresses in
                // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
                // the first one
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if (!ipAddress) {
                // If request was not forwarded
                ipAddress = req.connection.remoteAddress;
            }
            return ipAddress;
        },
        urlTitle: function (title) {
            return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
        }
    };
});
