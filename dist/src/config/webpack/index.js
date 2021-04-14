"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var name_1 = __importDefault(require("./name"));
var targets_1 = __importDefault(require("./targets"));
var devtool_1 = __importDefault(require("./devtool"));
var entry_1 = __importDefault(require("./entry"));
var output_1 = __importDefault(require("./output"));
var modules_1 = __importDefault(require("./modules"));
var resolve_1 = __importDefault(require("./resolve"));
var externals_1 = __importDefault(require("./externals"));
var plugins_1 = __importDefault(require("./plugins"));
var performance_1 = __importDefault(require("./performance"));
exports["default"] = (function (_a) {
    var mode = _a.mode, babel = _a.babel, frontity = _a.frontity, entryPoints = _a.entryPoints, _b = _a.publicPath, publicPath = _b === void 0 ? "/static/" : _b;
    var getConfig = function (target) { return ({
        mode: mode,
        name: name_1["default"]({ target: target }),
        target: targets_1["default"]({ target: target }),
        devtool: devtool_1["default"]({ mode: mode }),
        entry: entry_1["default"]({ target: target, mode: mode, entryPoints: entryPoints }),
        output: output_1["default"]({ target: target, mode: mode, outDir: frontity.outDir, publicPath: publicPath }),
        module: modules_1["default"]({ target: target, babel: babel, mode: mode }),
        resolve: resolve_1["default"](),
        externals: externals_1["default"]({ target: target }),
        plugins: plugins_1["default"]({ target: target, mode: mode, outDir: frontity.outDir }),
        performance: performance_1["default"]({ target: target })
    }); };
    return {
        module: getConfig("module"),
        es5: getConfig("es5"),
        server: getConfig("server")
    };
});
