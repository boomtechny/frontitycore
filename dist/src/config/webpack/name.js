"use strict";
exports.__esModule = true;
// It is important to use the names 'client' and 'server' for
// webpack-hot-server-middleware.
exports["default"] = (function (_a) {
    var target = _a.target;
    return target === "server" ? "server" : "client";
});
