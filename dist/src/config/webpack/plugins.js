"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var webpack_plugin_1 = __importDefault(require("@loadable/webpack-plugin"));
var webpack_1 = require("webpack");
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
exports["default"] = (function (_a) {
    var target = _a.target, mode = _a.mode, outDir = _a.outDir;
    var config = [
        // Create HTML files for bundle analyzing.
        new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: (target !== "server" ? "../" : "") + "analyze/" + target + "-" + mode + ".html",
            openAnalyzer: false,
            logLevel: "silent"
        }),
        new webpack_1.WatchIgnorePlugin([new RegExp(outDir)]),
        new webpack_1.IgnorePlugin(/^encoding$/),
    ];
    // Support HMR in development. Only needed in client.
    if (target !== "server" && mode === "development")
        config.push(new webpack_1.HotModuleReplacementPlugin());
    // Needed for code splitting in client.
    if (target !== "server")
        config.push(new webpack_plugin_1["default"]({
            filename: "../bundling/chunks." + target + ".json"
        }));
    // Avoid code splitting in server.
    if (target === "server")
        config.push(new webpack_1.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
    return config;
});
