"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var http_1 = require("http");
//import socketio from 'socket.io';
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var serverWs = require('./serverws');
// import './database';
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(index_1.default);
app.use(express_fileupload_1.default());
var server = http_1.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});
//const io = new socketio.Server(server);
io.on('connection', function (socket) {
    console.log('Socket', socket.id);
});
app.set('socketio', io);
var port = process.env.PORT || 3333;
var serverListener = server.listen(port, function () {
    console.log('Server started on port: ', port);
});
serverWs(serverListener);
