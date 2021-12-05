"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access = void 0;
var index_1 = __importDefault(require("../database/index"));
var Vehicle_1 = require("./Vehicle");
var Schema = index_1.default.Schema;
var accessSchema = new Schema({
    vehicle: {
        type: Vehicle_1.vehicleSchema,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: Date,
});
exports.Access = index_1.default.model('Access', accessSchema);
