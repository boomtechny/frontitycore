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
/**
 * Generate the object for Webpack's performance configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/performance/.
 *
 * @param options - Defined in {@link PerformanceOptions}.
 *
 * @returns The configuration object for Webpack.
 */
var performance = function (_a) {
    var target = _a.target;
    return (__assign({}, (target === "server"
        ? {
            // Max size recommended for the server bundle: 5Mbs.
            maxEntrypointSize: 5000000,
            maxAssetSize: 5000000
        }
        : {
            // Max size recommended for the client bundles: 500Kbs.
            maxEntrypointSize: 500000,
            maxAssetSize: 500000
        })));
};
exports["default"] = performance;
