"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://smartaccessapi:k9QtlydWMoh6QRvI@smartaccess.wgrap.mongodb.net/SmartAccess?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
exports.default = mongoose;
