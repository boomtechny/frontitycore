"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var create_server_1 = __importDefault(require("./create-server"));
var open_browser_1 = require("./open-browser");
/**
 * Create an express app ready to be used with webpack-dev-middleware.
 *
 * @param options - Defined in {@link DevOptions}.
 *
 * @returns - An object with the app and a callback function that starts the
 * server when Webpack has finished.
 */
exports["default"] = (function (_a) {
    var mode = _a.mode, port = _a.port, isHttps = _a.isHttps, target = _a.target, _b = _a.openBrowser, openBrowser = _b === void 0 ? true : _b, _c = _a.publicPath, publicPath = _c === void 0 ? "/static" : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var app, server, createProxyMiddleware, clientFinished, serverFinished, isListening, url, done;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    app = express_1["default"]();
                    return [4 /*yield*/, create_server_1["default"]({ app: app, isHttps: isHttps })];
                case 1:
                    server = _d.sent();
                    createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
                    clientFinished = false;
                    serverFinished = false;
                    isListening = false;
                    url = (isHttps ? "https" : "http") + "://localhost:" + port;
                    // Do not return a response until webpack has finished loading.
                    app.use(function (_, ___, next) {
                        if (!isListening) {
                            var interval_1 = setInterval(function () {
                                if (isListening) {
                                    clearInterval(interval_1);
                                    next();
                                }
                            }, 1000);
                        }
                        else {
                            next();
                        }
                    });
                    // Start listening.
                    app.use('/api', createProxyMiddleware({ target: process.env.LOCALSITE, changeOrigin: true }));
                    server.listen(port, function () {
                        console.log('btread');
                        console.log('\x1b[36m', 'BT Modified 2');
                        console.log("\n\nSERVER STARTED -- Listening @ " + url + "\n  - mode: " + mode + "\n  - target: " + target + "\n  - public-path: " + publicPath + "\n\n");
                    });
                    // Open localhost on the local browser.
                    if (openBrowser)
                        open_browser_1.openBrowserTab(url);
                    done = function (compiler) {
                        compiler.compilers[0].hooks.done.tapAsync("frontity-dev-server", function (_, cb) {
                            clientFinished = true;
                            if (clientFinished && serverFinished && !isListening) {
                                isListening = true;
                            }
                            cb();
                        });
                        compiler.compilers[1].hooks.done.tapAsync("frontity-dev-server", function (_, cb) {
                            serverFinished = true;
                            if (clientFinished && serverFinished && !isListening) {
                                isListening = true;
                            }
                            cb();
                        });
                    };
                    return [2 /*return*/, { app: app, done: done }];
            }
        });
    });
});
