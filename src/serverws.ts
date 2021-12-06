// @ts-ignore
const WebSocket = require('ws');
const clients: any[] = [];

function onError(ws: any, err: { message: any }) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws: any, data: any) {
    clients.forEach(client => client.send(`${data}`));
}

function onConnection(
    ws: {
        on: (
            arg0: string,
            arg1: { (data: any): void; (error: any): void },
        ) => void;
    },
    req: any,
) {
    clients.push(ws);
    ws.on('message', (data: any) => onMessage(ws, data));
    ws.on('error', (error: any) => onError(ws, error));
    console.log(`onConnection`);
}

module.exports = (server: any) => {
    // @ts-ignore
    const wss = new WebSocket.Server({
        server,
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;
};
