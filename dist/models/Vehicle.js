"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.vehicleSchema = void 0;
var index_1 = __importDefault(require("../database/index"));
var Schema = index_1.default.Schema;
exports.vehicleSchema = new Schema({
    plate: {
        type: String,
        unique: true,
        required: true,
    },
    color: {
        type: String,
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
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
exports.Vehicle = index_1.default.model('Vehicle', exports.vehicleSchema);
