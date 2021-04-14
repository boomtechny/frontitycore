"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var require_from_string_1 = __importDefault(require("require-from-string"));
var source_map_support_1 = __importDefault(require("source-map-support"));
var interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
};
var isMultiCompiler = function (compiler) {
    // Duck typing as `instanceof MultiCompiler` fails when npm decides to
    // install multiple instances of webpack.
    return compiler && compiler.compilers;
};
var findCompiler = function (multiCompiler, name) {
    return multiCompiler.compilers.filter(function (compiler) { return compiler.name.indexOf(name) === 0; });
};
var findStats = function (multiStats, name) {
    return multiStats.stats.filter(function (stats) { return stats.compilation.name.indexOf(name) === 0; });
};
var getFilename = function (serverStats, outputPath, chunkName) {
    var assetsByChunkName = serverStats.toJson().assetsByChunkName;
    var filename = assetsByChunkName[chunkName] || "";
    // If source maps are generated `assetsByChunkName.main`
    // will be an array of filenames.
    return path_1["default"].join(outputPath, Array.isArray(filename)
        ? filename.find(function (asset) { return /\.js$/.test(asset); })
        : filename);
};
var getServerRenderer = function (filename, buffer) {
    var errMessage = "The 'server' compiler must export a function in the form of `(options) => (req, res, next) => void`";
    var serverRenderer = interopRequireDefault(require_from_string_1["default"](buffer.toString(), filename));
    if (typeof serverRenderer !== "function") {
        throw new Error(errMessage);
    }
    return serverRenderer;
};
function installSourceMapSupport(fs) {
    source_map_support_1["default"].install({
        // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
        // lands we can be less aggressive and explicitly invalidate the source
        // map cache when Webpack recompiles.
        emptyCacheBetweenOperations: true,
        retrieveFile: function (source) {
            try {
                return fs.readFileSync(source, "utf8");
            }
            catch (ex) {
                // Doesn't exist
            }
        }
    });
}
var createConnectHandler = function (error, serverRenderer) { return function (req, res, next) {
    if (error) {
        return next(error);
    }
    serverRenderer(req, res, next);
}; };
function webpackHotServerMiddleware(multiCompiler) {
    if (!isMultiCompiler(multiCompiler)) {
        throw new Error("Expected webpack compiler to contain both a 'client' and/or 'server' config");
    }
    var serverCompiler = findCompiler(multiCompiler, "server")[0];
    var clientCompilers = findCompiler(multiCompiler, "client");
    if (!serverCompiler) {
        throw new Error("Expected a webpack compiler named 'server'");
    }
    var outputFs = serverCompiler.outputFileSystem;
    var outputPath = serverCompiler.outputPath;
    installSourceMapSupport(outputFs);
    var serverRenderer;
    var error = false;
    var doneHandler = function (multiStats) {
        error = false;
        var serverStats = findStats(multiStats, "server")[0];
        // Server compilation errors need to be propagated to the client.
        if (serverStats.compilation.errors.length) {
            error = serverStats.compilation.errors[0];
            return;
        }
        var clientStatsJson = null;
        if (clientCompilers.length) {
            var clientStats = findStats(multiStats, "client");
            clientStatsJson = clientStats.map(function (obj) { return obj.toJson(); });
            if (clientStatsJson.length === 1) {
                clientStatsJson = clientStatsJson[0];
            }
        }
        var filename = getFilename(serverStats, outputPath, "main");
        var buffer = outputFs.readFileSync(filename);
        try {
            serverRenderer = getServerRenderer(filename, buffer);
        }
        catch (ex) {
            error = ex;
        }
    };
    multiCompiler.hooks.done.tap("WebpackHotServerMiddleware", doneHandler);
    return function () {
        // eslint-disable-next-line prefer-spread,prefer-rest-params
        return createConnectHandler(error, serverRenderer).apply(null, arguments);
    };
}
exports["default"] = webpackHotServerMiddleware;
