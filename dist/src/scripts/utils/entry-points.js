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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateClientEntryPoints = exports.generateServerEntryPoint = exports.checkForPackages = exports.entryPoint = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var lodash_1 = require("lodash");
var get_variable_1 = __importDefault(require("../../utils/get-variable"));
var entry_exists_1 = __importDefault(require("./entry-exists"));
var entryPoint = function (_a) {
    var name = _a.name, mode = _a.mode, type = _a.type;
    return __awaiter(void 0, void 0, void 0, function () {
        var extension;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    extension = false;
                    if (!(mode !== "default")) return [3 /*break*/, 5];
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + mode + "/" + type)];
                case 1:
                    // Check first inside the mode and in the type.
                    extension = _b.sent();
                    if (extension)
                        return [2 /*return*/, name + "/src/" + mode + "/" + type];
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + mode + "/" + type + "/index")];
                case 2:
                    // Check first inside the mode and in the type but in a folder.
                    extension = _b.sent();
                    if (extension)
                        return [2 /*return*/, name + "/src/" + mode + "/" + type + "/index"];
                    if (!(type === "client" || type === "server")) return [3 /*break*/, 5];
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + mode)];
                case 3:
                    // Check if it's a file.
                    extension = _b.sent();
                    if (extension) {
                        return [2 /*return*/, name + "/src/" + mode];
                    }
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + mode + "/index")];
                case 4:
                    // Check if it's a folder.
                    extension = _b.sent();
                    if (extension) {
                        return [2 /*return*/, name + "/src/" + mode + "/index"];
                    }
                    _b.label = 5;
                case 5: return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + type)];
                case 6:
                    // Check now outside of the mode for the specific type.
                    extension = _b.sent();
                    if (extension)
                        return [2 /*return*/, name + "/src/" + type];
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/" + type + "/index")];
                case 7:
                    // Check now outside of the mode for the specific type but in a folder.
                    extension = _b.sent();
                    if (extension)
                        return [2 /*return*/, name + "/src/" + type + "/index"];
                    return [4 /*yield*/, entry_exists_1["default"](name + "/src/index")];
                case 8:
                    // And finally, if it's client or server, check on index as well.
                    extension = _b.sent();
                    if ((type === "client" || type === "server") && extension) {
                        return [2 /*return*/, name + "/src/index"];
                    }
                    // Don't return path if no entry point is found.
                    return [2 /*return*/, ""];
            }
        });
    });
};
exports.entryPoint = entryPoint;
// Throw if any of the packages is not installed.
var checkForPackages = function (_a) {
    var sites = _a.sites;
    return __awaiter(void 0, void 0, void 0, function () {
        var packages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    packages = lodash_1.uniq(lodash_1.flatten(sites.map(function (site) { return site.packages; })));
                    return [4 /*yield*/, Promise.all(
                        // Iterate over the packages.
                        packages.map(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            var exists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.pathExists(path_1.resolve(process.cwd(), "node_modules", name))];
                                    case 1:
                                        exists = _a.sent();
                                        if (!exists)
                                            throw new Error("The package \"" + name + "\" doesn't seem to be installed. Make sure you did \"npm install " + name + "\"");
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.checkForPackages = checkForPackages;
// Turn a list of sites into a list of packages that can be used to create the templates.
var getPackagesList = function (_a) {
    var sites = _a.sites, type = _a.type;
    return __awaiter(void 0, void 0, void 0, function () {
        var packages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    packages = lodash_1.uniqBy(lodash_1.flatten(sites.map(function (site) {
                        return site.packages.map(function (name) { return ({ mode: site.mode, name: name }); });
                    })), function (_a) {
                        var mode = _a.mode, name = _a.name;
                        return "" + mode + name;
                    });
                    return [4 /*yield*/, Promise.all(
                        // Iterate over the packages.
                        packages.map(function (_a) {
                            var name = _a.name, mode = _a.mode;
                            return __awaiter(void 0, void 0, void 0, function () {
                                var path;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, exports.entryPoint({ name: name, mode: mode, type: type })];
                                        case 1:
                                            path = _b.sent();
                                            return [2 /*return*/, { name: name, mode: mode, path: path }];
                                    }
                                });
                            });
                        })
                        // Remove the packages where the entry point doesn't exist.
                        )];
                case 1: return [2 /*return*/, (_b.sent()).filter(function (_a) {
                        var path = _a.path;
                        return path !== "";
                    })];
            }
        });
    });
};
var generateImportsTemplate = function (_a) {
    var packages = _a.packages, type = _a.type;
    var template = "import " + type + " from \"@frontity/core/src/" + type + "\";\n";
    // Create the "import" part of the file.
    packages.forEach(function (_a) {
        var name = _a.name, mode = _a.mode, path = _a.path;
        return (template += "import " + get_variable_1["default"](name, mode) + " from \"" + path + "\";\n");
    });
    // Create the "const packages = {...}" part of the file.
    template += "\nconst packages = {\n";
    packages.forEach(function (_a) {
        var name = _a.name, mode = _a.mode;
        return (template += "  " + get_variable_1["default"](name, mode) + ",\n");
    });
    template += "};\n\n";
    template += "export default " + type + "({ packages });\n\n";
    return template;
};
var generateHotModuleTemplate = function (_a) {
    var packages = _a.packages, template = _a.template;
    template += "if (module[\"hot\"]) {\n  module[\"hot\"].accept(\n    [\n      \"@frontity/core/src/client\",\n";
    packages.forEach(function (_a) {
        var path = _a.path;
        template += "      \"" + path + "\",\n";
    });
    template += "    ],\n    () => {\n      const client = require(\"@frontity/core/src/client\").default;\n";
    packages.forEach(function (_a) {
        var name = _a.name, mode = _a.mode, path = _a.path;
        return (template += "      const " + get_variable_1["default"](name, mode) + " = require(\"" + path + "\").default;\n");
    });
    template += "      const packages = {\n";
    packages.forEach(function (_a) {
        var name = _a.name, mode = _a.mode;
        return (template += "        " + get_variable_1["default"](name, mode) + ",\n");
    });
    template += "      };\n      client({ packages });\n    }\n  );\n}";
    return template;
};
// Create an entry-point file for the server and return the bundle name and path.
var generateServerEntryPoint = function (_a) {
    var sites = _a.sites, outDir = _a.outDir;
    return __awaiter(void 0, void 0, void 0, function () {
        var packages, template, path;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getPackagesList({ sites: sites, type: "server" })];
                case 1:
                    packages = _b.sent();
                    template = generateImportsTemplate({ packages: packages, type: "server" });
                    path = outDir + "/bundling/entry-points/server.ts";
                    return [4 /*yield*/, fs_extra_1.writeFile(path, template, "utf8")];
                case 2:
                    _b.sent();
                    return [2 /*return*/, { name: "server", path: path }];
            }
        });
    });
};
exports.generateServerEntryPoint = generateServerEntryPoint;
// Create entry-point files for the client and return all the bundle names and pathes.
var generateClientEntryPoints = function (_a) {
    var sites = _a.sites, outDir = _a.outDir, mode = _a.mode;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(
                    // Iterate over the sites
                    sites.map(function (site) { return __awaiter(void 0, void 0, void 0, function () {
                        var packages, template, path;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getPackagesList({
                                        sites: [site],
                                        type: "client"
                                    })];
                                case 1:
                                    packages = _a.sent();
                                    if (packages.length === 0)
                                        return [2 /*return*/];
                                    template = generateImportsTemplate({
                                        packages: packages,
                                        type: "client"
                                    });
                                    if (mode === "development") {
                                        template = generateHotModuleTemplate({ template: template, packages: packages });
                                    }
                                    // Create sub-folder for site.
                                    return [4 /*yield*/, fs_extra_1.ensureDir(outDir + "/bundling/entry-points/" + site.name)];
                                case 2:
                                    // Create sub-folder for site.
                                    _a.sent();
                                    path = outDir + "/bundling/entry-points/" + site.name + "/client.ts";
                                    return [4 /*yield*/, fs_extra_1.writeFile(path, template, "utf8")];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, { name: site.name, path: path }];
                            }
                        });
                    }); })
                    // Filter non-existent bundles.
                    )];
                case 1: return [2 /*return*/, (_b.sent()).filter(function (bundle) { return bundle; })];
            }
        });
    });
};
exports.generateClientEntryPoints = generateClientEntryPoints;
exports["default"] = (function (_a) {
    var sites = _a.sites, outDir = _a.outDir, mode = _a.mode;
    return __awaiter(void 0, void 0, void 0, function () {
        var serverEntryPoints, clientEntryPoints;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Check if all the packages are installed.
                return [4 /*yield*/, exports.checkForPackages({ sites: sites })];
                case 1:
                    // Check if all the packages are installed.
                    _b.sent();
                    return [4 /*yield*/, exports.generateServerEntryPoint({ sites: sites, outDir: outDir })];
                case 2:
                    serverEntryPoints = _b.sent();
                    return [4 /*yield*/, exports.generateClientEntryPoints({
                            sites: sites,
                            outDir: outDir,
                            mode: mode
                        })];
                case 3:
                    clientEntryPoints = _b.sent();
                    return [2 /*return*/, __spreadArray(__spreadArray([], clientEntryPoints), [serverEntryPoints])];
            }
        });
    });
});
