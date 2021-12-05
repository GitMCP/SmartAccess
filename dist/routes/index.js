"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserRouter_1 = __importDefault(require("./UserRouter"));
var PlateRouter_1 = __importDefault(require("./PlateRouter"));
var VehicleRouter_1 = __importDefault(require("./VehicleRouter"));
var AccessRouter_1 = __importDefault(require("./AccessRouter"));
var Login_1 = __importDefault(require("./Login"));
var routes = express_1.Router();
routes.use('/login', Login_1.default);
routes.use('/users', UserRouter_1.default);
routes.use('/plate', PlateRouter_1.default);
routes.use('/vehicles', VehicleRouter_1.default);
routes.use('/access', AccessRouter_1.default);
exports.default = routes;
