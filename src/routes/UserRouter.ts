import { Router } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

const UserRouter = Router();

UserRouter.get('/:id?', async (req, res) => {
    const { id } = req.query;
    const userRepository = getRepository(User);
    if (id) {
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return res.json({ message: 'User does not exist' });
        }
        return res.json(user);
    }
    const users = await userRepository.find({ where: { deleted_at: null } });

    return res.json(users);
});

UserRouter.post('/', async (req, res) => {
    try {
        const { type, name, email, password } = req.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ type, name, email, password });

        res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
UserRouter.delete('/:id?', async (req, res) => {
    const { id } = req.query;
    const userRepository = getRepository(User);
    if (!id) {
        return res.json({ message: 'Please submit an user id' });
    }
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return res.json({ message: 'User does not exist' });
    }
    user.deleted_at = new Date();

    await userRepository.save(user);

    return res.json({ message: 'User deleted' });
});
export default UserRouter;
