"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var path_1 = require("path");
// Get the root path of the directory where the script was started.
var rootPath = process.cwd();
var filenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js"
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js"
    },
    server: {
        development: "server.js",
        production: "server.js"
    }
};
var paths = {
    module: "static",
    es5: "static",
    server: ""
};
// Same with chunks, only hashes in production and es5/module in the filename.
var chunkFilenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js"
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js"
    }
};
exports["default"] = (function (_a) {
    var target = _a.target, mode = _a.mode, outDir = _a.outDir, publicPath = _a.publicPath;
    return (__assign(__assign({ filename: filenames[target][mode], path: path_1.resolve(rootPath, outDir, paths[target]), 
        // Ensure there is a trailing slash in the public path.
        publicPath: publicPath.replace(/\/?$/, "/") }, (target !== "server" && { chunkFilename: chunkFilenames[target][mode] })), (target === "server" && { libraryTarget: "commonjs2" })));
});
