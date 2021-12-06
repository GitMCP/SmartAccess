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
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var multer_1 = __importDefault(require("multer"));
var multer_2 = __importDefault(require("../config/multer"));
var fs_1 = __importDefault(require("fs"));
var Vehicle_1 = require("../models/Vehicle");
var CreateAccessService_1 = require("../services/CreateAccessService");
var WebSocket = require('ws');
var ws = new WebSocket("ws://localhost:" + (process.env.PORT || 3333) + "/");
var PlateRouter = express_1.Router();
function base64_encode(file) {
    var bitmap = fs_1.default.readFileSync(file);
    return bitmap.toString('base64');
}
PlateRouter.post('/', multer_1.default(multer_2.default).single('file'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var io, instance, body, plate, knownVehicle, createAccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                io = req.app.get('socketio');
                instance = axios_1.default.create({
                    headers: {
                        post: {
                            Authorization: 'Token 4de758197c1b5fccf766110c28b9212e76bee419',
                        },
                    },
                });
                body = {
                    upload: base64_encode(req.file.path),
                };
                fs_1.default.unlinkSync(req.file.path);
                return [4 /*yield*/, instance.post('https://api.platerecognizer.com/v1/plate-reader/', body)];
            case 1: return [4 /*yield*/, (_a.sent()).data.results[0].plate.toUpperCase()];
            case 2:
                plate = _a.sent();
                return [4 /*yield*/, Vehicle_1.Vehicle.findOne({ plate: plate })];
            case 3:
                knownVehicle = _a.sent();
                if (!knownVehicle) return [3 /*break*/, 5];
                createAccess = new CreateAccessService_1.CreateAccessService();
                return [4 /*yield*/, createAccess.execute({ vehicle: knownVehicle })];
            case 4:
                _a.sent();
                io.emit('LAST_VEHICLE', {
                    plate: knownVehicle.plate,
                    model: knownVehicle.brand + " " + knownVehicle.model,
                });
                ws.send("Libera Cancela");
                return [2 /*return*/, res.status(200).json({
                        action: 'liberar',
                        message: 'Veículo já cadastrado, liberar cancela',
                    })];
            case 5:
                io.emit('UNKNOWN_VEHICLE', plate.toUpperCase());
                return [2 /*return*/, res.status(200).json({
                        action: 'aguardar',
                        message: 'Veículo não cadastrado, aguardar cadastro',
                    })];
        }
    });
}); });
exports.default = PlateRouter;
