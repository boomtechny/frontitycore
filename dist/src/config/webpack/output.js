"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// Get the root path of the directory where the script was started.
const rootPath = process.cwd();
const filenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js",
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js",
    },
    server: {
        development: "server.js",
        production: "server.js",
    },
};
const paths = {
    module: "static",
    es5: "static",
    server: "",
};
// Same with chunks, only hashes in production and es5/module in the filename.
const chunkFilenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js",
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js",
    },
};
exports.default = ({ target, mode, outDir, publicPath, }) => (Object.assign(Object.assign({ filename: filenames[target][mode], path: path_1.resolve(rootPath, outDir, paths[target]), 
    // Ensure there is a trailing slash in the public path.
    publicPath: publicPath.replace(/\/?$/, "/") }, (target !== "server" && { chunkFilename: chunkFilenames[target][mode] })), (target === "server" && { libraryTarget: "commonjs2" })));
