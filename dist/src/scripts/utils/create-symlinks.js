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
var symlink_dir_1 = __importDefault(require("symlink-dir"));
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var semverRE = /^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
var RE = /^(file:)?(~)?(\.{0,2}?\/([\w+\-_]+)?)+$/;
var isNotSemanticVersion = function (dir) { return !semverRE.test(dir); };
var isValidLinkPath = function (dir) { return RE.test(dir); };
var isValidNodePackage = function (dir) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, fs_extra_1.pathExists(path_1.resolve(dir, "package.json"))];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports["default"] = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var packageJsonPath, packageJson, _a, _b, dependencies, dependencyNames;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                packageJsonPath = path_1.resolve(process.env.CWD, "./package.json");
                _b = (_a = JSON).parse;
                return [4 /*yield*/, fs_extra_1.readFile(packageJsonPath, { encoding: "utf8" })];
            case 1:
                packageJson = _b.apply(_a, [_c.sent()]);
                dependencies = packageJson.dependencies;
                dependencyNames = Object.keys(dependencies).filter(function (dependency) {
                    return isNotSemanticVersion(dependencies[dependency]) &&
                        isValidLinkPath(dependencies[dependency]);
                });
                return [4 /*yield*/, Promise.all(
                    // Iterate over the dependencies.
                    dependencyNames.map(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                        var packageDir, dir, exists, isNodePackage, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    packageDir = dependencies[name].replace(/^(file:)/, "");
                                    dir = path_1.resolve(process.env.CWD, packageDir);
                                    return [4 /*yield*/, fs_extra_1.pathExists(dir)];
                                case 1:
                                    exists = _a.sent();
                                    return [4 /*yield*/, isValidNodePackage(dir)];
                                case 2:
                                    isNodePackage = _a.sent();
                                    if (!exists) {
                                        throw new Error(dir + " for " + name + " does not exist.");
                                    }
                                    if (!isNodePackage) {
                                        throw new Error(name + " is not a valid node package.");
                                    }
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, symlink_dir_1["default"](dir, path_1.resolve("node_modules", name))];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    e_1 = _a.sent();
                                    throw new Error(e_1);
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
