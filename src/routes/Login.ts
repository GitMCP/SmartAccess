import { Router } from 'express';
import { User } from '../models/User';

const LoginRouter = Router();

LoginRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (user) {
            return res.status(200).json({ message: 'Successfully logged in' });
        }

        return res.status(400).json({ message: 'User not found' });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
});

export default LoginRouter;
