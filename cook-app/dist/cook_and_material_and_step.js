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
exports.AllUpdate = exports.AllDelete = exports.AllCreate = exports.cook_and_material_and_step = void 0;
var express_1 = __importDefault(require("express"));
var DatabaseCreate_1 = require("./DatabaseCreate");
var cook_1 = require("./cook");
var material_1 = require("./material");
var step_1 = require("./step");
exports.cook_and_material_and_step = express_1.default.Router();
var AllCreate = function (cookName, materials, steps) { return __awaiter(void 0, void 0, void 0, function () {
    var registeredMaterials, registeredSteps, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                registeredMaterials = materials.filter(function (m) { return m !== ""; });
                registeredSteps = steps.filter(function (s) { return s !== ""; });
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION')];
            case 1:
                _a.sent();
                return [4 /*yield*/, cook_1.CookFunc.InsertCook(cookName)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, material_1.MaterialFunc.InsertMaterials(result.lastID, registeredMaterials)];
            case 3:
                _a.sent();
                return [4 /*yield*/, step_1.StepFunc.InsertSteps(result.lastID, registeredSteps)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)('COMMIT TRANSACTION')];
            case 5:
                _a.sent();
                return [2 /*return*/, result];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, (0, DatabaseCreate_1.dbRun)('ROLLBACK TRANSACTION')];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.AllCreate = AllCreate;
var AllDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION')];
            case 1:
                _a.sent();
                return [4 /*yield*/, cook_1.CookFunc.DeleteCook(id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, material_1.MaterialFunc.DeleteMaterial(id)];
            case 3:
                _a.sent();
                return [4 /*yield*/, step_1.StepFunc.DeleteStep(id)];
            case 4:
                _a.sent();
                return [2 /*return*/, (0, DatabaseCreate_1.dbRun)('COMMIT TRANSACTION')];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, (0, DatabaseCreate_1.dbRun)('ROLLBACK TRANSACTION')];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.AllDelete = AllDelete;
var AllUpdate = function (id, cookName, materials, steps) { return __awaiter(void 0, void 0, void 0, function () {
    var registeredMaterials, registeredSteps, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)('BEGIN TRANSACTION')];
            case 1:
                _a.sent();
                return [4 /*yield*/, step_1.StepFunc.DeleteStep(id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, material_1.MaterialFunc.DeleteMaterial(id)];
            case 3:
                _a.sent();
                return [4 /*yield*/, cook_1.CookFunc.DeleteCook(id)];
            case 4:
                _a.sent();
                registeredMaterials = materials.filter(function (m) { return m !== ""; });
                registeredSteps = steps.filter(function (s) { return s !== ""; });
                return [4 /*yield*/, cook_1.CookFunc.InsertCook(cookName)];
            case 5:
                result = _a.sent();
                return [4 /*yield*/, material_1.MaterialFunc.InsertMaterials(result.lastID, registeredMaterials)];
            case 6:
                _a.sent();
                return [4 /*yield*/, step_1.StepFunc.InsertSteps(result.lastID, registeredSteps)];
            case 7:
                _a.sent();
                return [4 /*yield*/, (0, DatabaseCreate_1.dbRun)('COMMIT TRANSACTION')];
            case 8:
                _a.sent();
                return [2 /*return*/, result];
            case 9:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, (0, DatabaseCreate_1.dbRun)('ROLLBACK TRANSACTION')];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.AllUpdate = AllUpdate;
exports.cook_and_material_and_step.post("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cookName, materials, steps, result, lastID, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, cookName = _a.cookName, materials = _a.materials, steps = _a.steps;
                return [4 /*yield*/, (0, exports.AllCreate)(cookName, materials, steps)];
            case 1:
                result = _b.sent();
                lastID = { lastID: result.lastID };
                res.status(200).json(lastID);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.cook_and_material_and_step.delete("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, (0, exports.AllDelete)(id)];
            case 1:
                _a.sent();
                res.status(200).json({ id: id });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.cook_and_material_and_step.put("/:id(\\d+)", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, cookName, materials, steps, result, lastID, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                _a = req.body, cookName = _a.cookName, materials = _a.materials, steps = _a.steps;
                return [4 /*yield*/, (0, exports.AllUpdate)(id, cookName, materials, steps)];
            case 1:
                result = _b.sent();
                lastID = { lastID: result.lastID };
                res.status(200).json(lastID);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                res.status(500).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
