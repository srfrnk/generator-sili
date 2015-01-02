require("requirejs").define("models/cloudinary", [], function () {
    "use strict";
    var cloudinary = require('cloudinary');
    cloudinary.config({
        cloud_name: 'meet-u',
        api_key: '',
        api_secret: ''
    });
    return {

    };
});
