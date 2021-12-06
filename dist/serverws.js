"use strict";
// @ts-ignore
var WebSocket = require('ws');
var clients = [];
function onError(ws, err) {
    console.error("onError: " + err.message);
}
function onMessage(ws, data) {
    clients.forEach(function (client) { return client.send("" + data); });
}
function onConnection(ws, req) {
    clients.push(ws);
    ws.on('message', function (data) { return onMessage(ws, data); });
    ws.on('error', function (error) { return onError(ws, error); });
    console.log("onConnection");
}
module.exports = function (server) {
    // @ts-ignore
    var wss = new WebSocket.Server({
        server: server,
    });
    wss.on('connection', onConnection);
    console.log("App Web Socket Server is running!");
    return wss;
};
