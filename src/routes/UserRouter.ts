import { Router } from 'express';
import { User } from '../models/User';
import { CreateUserService } from '../services/CreateUserService';

const UserRouter = Router();

UserRouter.get('/:id?', async (req, res) => {
    const { id } = req.query;
    if (id) {
        const user = await User.findOne({ id });

        if (!user) {
            return res.json({ message: 'User does not exist' });
        }
        return res.json(user);
    }
    const users = await User.find({ where: { deleted_at: null } });

    return res.json(users);
});

UserRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        res.json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
});
UserRouter.delete('/:id?', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.json({ message: 'Please submit an user id' });
    }
    const user = await User.findOne({ id });
    if (!user) {
        return res.json({ message: 'User does not exist' });
    }
    user.deleted_at = new Date();

    return res.json({ message: 'User deleted' });
});
export default UserRouter;
