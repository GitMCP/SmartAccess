import express from 'express';
import Router from './routes/index';
import { createServer } from 'http'
//import socketio from 'socket.io';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import './database';

const app = express();
app.use(express.json());
app.use(Router);
app.use(cors());
app.use(fileUpload());
const server = createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});
//const io = new socketio.Server(server);

io.on('connection', (socket: any) => {
    console.log('Socket', socket.id);
});
app.set('socketio', io);

server.listen(process.env.PORT, () => {
    console.log('Server started on port 3333');
});
