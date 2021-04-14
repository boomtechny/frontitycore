"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.webpackAsync = void 0;
var chalk_1 = __importDefault(require("chalk"));
var webpack_1 = __importDefault(require("webpack"));
/**
 * Wrapper to run `webpack` asynchronously.
 *
 * @param config - Webpack's config object, defined in {@link
 * webpack.Configuration}.
 *
 * @returns A promise that resolves when Webpack finishes.
 */
var webpackAsync = function (config) {
    return new Promise(function (resolve, reject) {
        var compiler = webpack_1["default"](config);
        compiler.run(function (err, stats) {
            // Fatal Webpack errors, like wrong configuration.
            if (err)
                return reject(err);
            var info = stats.toJson();
            // Compilation errors, like missing modules, syntax errors, etc.
            if (stats.hasErrors())
                return reject(new Error(info.errors.join("\n\n")));
            // Compilation warnings, like dynamic modules, performance issues, etc.
            if (stats.hasWarnings())
                console.warn("\n" + chalk_1["default"].yellow(info.warnings.join("\n\n")) + "\n");
            // Compilation was successful.
            return resolve(compiler);
        });
    });
};
exports.webpackAsync = webpackAsync;
