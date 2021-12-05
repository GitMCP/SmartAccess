import { Router } from 'express';
import UserRouter from './UserRouter';
import PlateRouter from './PlateRouter';
import VehicleRouter from './VehicleRouter';
import AccessRouter from './AccessRouter';
import LoginRouter from './Login';

const routes = Router();
routes.use('/login', LoginRouter);
routes.use('/users', UserRouter);
routes.use('/plate', PlateRouter);
routes.use('/vehicles', VehicleRouter);
routes.use('/access', AccessRouter);

export default routes;
