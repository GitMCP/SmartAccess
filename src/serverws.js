const WebSocket = require('ws');
const clients = [];

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    clients.forEach(client => client.send(`${data}`));
}

function onConnection(ws, req) {
    clients.push(ws);
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

module.exports = server => {
    const wss = new WebSocket.Server({
        server,
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;
};
