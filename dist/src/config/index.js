"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var babel_1 = __importDefault(require("./babel"));
var webpack_1 = __importDefault(require("./webpack"));
var frontity_1 = __importDefault(require("./frontity"));
// This returns our FrontityConfig defaults. In the future,
// we will add here logic to inject the frontity.config.js of each package.
exports["default"] = (function (_a) {
    var mode = _a.mode, entryPoints = _a.entryPoints, publicPath = _a.publicPath;
    var frontity = frontity_1["default"]();
    var babel = babel_1["default"]({ mode: mode });
    var webpack = webpack_1["default"]({
        mode: mode,
        babel: babel,
        frontity: frontity,
        entryPoints: entryPoints,
        publicPath: publicPath
    });
    return {
        babel: babel,
        webpack: webpack,
        frontity: frontity
    };
});
