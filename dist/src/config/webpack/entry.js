"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// Get the root path of the directory where the script was started.
const rootPath = process.cwd();
exports.default = ({ target, mode, entryPoints, }) => {
    let config = {};
    if (target === "server") {
        const { path } = entryPoints.find((bundle) => bundle.name === "server");
        config = path_1.resolve(rootPath, path);
    }
    else {
        entryPoints
            .filter((bundle) => bundle.name !== "server")
            .forEach(({ name, path }) => {
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
};
