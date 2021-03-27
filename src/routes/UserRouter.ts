import { Router } from 'express';

const UserRouter = Router();

UserRouter.get('/', (req, res) => res.json({ message: 'Users route' }));

export default UserRouter;
