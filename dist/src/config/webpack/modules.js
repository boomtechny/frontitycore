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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var hash_it_1 = __importDefault(require("hash-it"));
var package_json_1 = __importDefault(require("@babel/core/package.json"));
var package_json_2 = __importDefault(require("babel-loader/package.json"));
exports["default"] = (function (_a) {
    var target = _a.target, babel = _a.babel, mode = _a.mode;
    return ({
        rules: [
            {
                // Support for js, jsx, ts and tsx files.
                test: /\.(j|t)sx?$/,
                use: {
                    loader: "babel-loader",
                    options: __assign({ 
                        // Don't use the babelrc file of the root.
                        babelrc: false, 
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true, 
                        // A unique hash using @babel/core's version, the babel-loader's version,
                        // and the contents of babel.
                        cacheIdentifier: "" + hash_it_1["default"]({
                            babelCoreVersion: package_json_1["default"].version,
                            babelLoaderVersion: package_json_2["default"].version,
                            babel: babel
                        }) }, babel[target])
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: function (file) {
                                var filename = /([^/\\]+)\.(?:png|jpe?g|gif|svg)$/.exec(file) || ["", "image"];
                                return mode === "development"
                                    ? filename[1] + ".[ext]"
                                    : filename[1] + "-[hash].[ext]";
                            },
                            outputPath: "images",
                            emitFile: target !== "server"
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: "raw-loader"
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: function (file) {
                            var filename = /([^/\\]+)\.(?:woff(2)?|ttf|eot)$/.exec(file) || [
                                "",
                                "font",
                            ];
                            return mode === "development"
                                ? filename[1] + ".[ext]"
                                : filename[1] + "-[hash].[ext]";
                        },
                        outputPath: "fonts",
                        limit: 8192,
                        emitFile: target !== "server"
                    }
                }
            },
        ]
    });
});
