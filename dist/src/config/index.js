"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel_1 = __importDefault(require("./babel"));
const webpack_1 = __importDefault(require("./webpack"));
const frontity_1 = __importDefault(require("./frontity"));
// This returns our FrontityConfig defaults. In the future,
// we will add here logic to inject the frontity.config.js of each package.
exports.default = ({ mode, entryPoints, publicPath, }) => {
    const frontity = frontity_1.default();
    const babel = babel_1.default({ mode });
    const webpack = webpack_1.default({
        mode,
        babel,
        frontity,
        entryPoints,
        publicPath,
    });
    return {
        babel,
        webpack,
        frontity,
    };
};
