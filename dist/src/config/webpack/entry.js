"use strict";
exports.__esModule = true;
var path_1 = require("path");
// Get the root path of the directory where the script was started.
var rootPath = process.cwd();
exports["default"] = (function (_a) {
    var target = _a.target, mode = _a.mode, entryPoints = _a.entryPoints;
    var config = {};
    if (target === "server") {
        var path = entryPoints.find(function (bundle) { return bundle.name === "server"; }).path;
        config = path_1.resolve(rootPath, path);
    }
    else {
        entryPoints
            .filter(function (bundle) { return bundle.name !== "server"; })
            .forEach(function (_a) {
            var name = _a.name, path = _a.path;
            config[name] = [];
            // This is needed for HMR in the client but only when we are in development.
            if (mode === "development")
                config[name].push("webpack-hot-middleware/client");
            // Add babel polyfill for the es5 packages (regeneratorRuntime and so on).
            if (target === "es5")
                config[name].push("babel-polyfill");
            config[name].push(path_1.resolve(rootPath, path));
        });
    }
    return config;
});
