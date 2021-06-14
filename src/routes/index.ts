import { Router } from 'express';
import UserRouter from './UserRouter';
import PlateRouter from './PlateRouter';
import socketio from 'socket.io';

const routes = Router();
routes.use('/users', UserRouter);
routes.use('/plate', PlateRouter);

export default routes;
