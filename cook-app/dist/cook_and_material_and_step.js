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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cook_and_material_and_step = void 0;
var express_1 = __importDefault(require("express"));
var DatabaseCreate_1 = require("./DatabaseCreate");
exports.cook_and_material_and_step = express_1.default.Router();
var AllCreate = function (cookName, materials, steps) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, i, err_1, errObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION');
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("INSERT INTO cookName (name) VALUES (\"".concat(cookName, "\")"))];
            case 1:
                result = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < materials.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("INSERT INTO material (name, cookName_id) VALUES (\"".concat(materials[i], "\", ").concat(result.lastID, ")"))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                i = 0;
                _a.label = 6;
            case 6:
                if (!(i < steps.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("INSERT INTO step (name, cookName_id) VALUES (\"".concat(steps[i], "\", ").concat(result.lastID, ")"))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9:
                (0, DatabaseCreate_1.dbRun)('COMMIT');
                return [2 /*return*/, Promise.resolve(result)];
            case 10:
                err_1 = _a.sent();
                errObj = new Error("Error occures in All Create function");
                return [2 /*return*/, Promise.reject(errObj)];
            case 11: return [2 /*return*/];
        }
    });
}); };
var AllDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2, errObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION');
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("delete from step where cookName_id = ".concat(id))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("delete from material where cookName_id = ".concat(id))];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)("delete from cookName where id = ".concat(id))];
            case 3:
                _a.sent();
                (0, DatabaseCreate_1.dbRun)('COMMIT');
                Promise.resolve();
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                errObj = new Error("Error occures in All Delete function");
                Promise.reject(errObj);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.cook_and_material_and_step.post("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cookName, materials, steps, registeredMaterials, registeredSteps, result, lastID, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, cookName = _a.cookName, materials = _a.materials, steps = _a.steps;
                registeredMaterials = materials.filter(function (m) { return m !== ""; });
                registeredSteps = steps.filter(function (s) { return s !== ""; });
                return [4 /*yield*/, AllCreate(cookName, registeredMaterials, registeredSteps)];
            case 1:
                result = _b.sent();
                lastID = { lastID: result.lastID };
                res.status(200).json(lastID);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.cook_and_material_and_step.delete("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, AllDelete(id)];
            case 1:
                _a.sent();
                res.status(200).json({ id: id });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.cook_and_material_and_step.put("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, cookName, materials, steps, registeredMaterials, registeredSteps, result, lastID, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION');
                id = req.params.id;
                return [4 /*yield*/, AllDelete(id)];
            case 1:
                _b.sent();
                _a = req.body, cookName = _a.cookName, materials = _a.materials, steps = _a.steps;
                registeredMaterials = materials.filter(function (m) { return m !== ""; });
                registeredSteps = steps.filter(function (s) { return s !== ""; });
                return [4 /*yield*/, AllCreate(cookName, registeredMaterials, registeredSteps)];
            case 2:
                result = _b.sent();
                (0, DatabaseCreate_1.dbRun)('COMMIT');
                lastID = { lastID: result.lastID };
                res.status(200).json(lastID);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
