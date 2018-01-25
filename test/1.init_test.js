"use strict";
var fileSystem = require('fs'),
    reporter = require('nodeunit').reporters.default;
(function () {
    var collection = [];

    fileSystem.readdirSync(_dirname)
        .filter(function (file) {
            return (file.substr(file.length - 2) === "js" &&
                (file != "1.init_test.js") &&
                (file != "test-controller.js") &&
                (file != "test-server.js"));
        }).forEach(function (file) {
            collection.push(_dirname + "/" + file);
        });

    reporter.run(collection);
})();