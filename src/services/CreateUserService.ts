import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
    type: string;
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        type,
        name,
        email,
        password,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const UserExists = await usersRepository.findOne({
            where: { email },
        });
        if (UserExists) {
            throw new Error('E-mail address already in use');
        }

        const user = usersRepository.create({ type, name, email, password });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
