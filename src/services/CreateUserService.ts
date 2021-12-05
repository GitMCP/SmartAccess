import { User } from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<any> {
        const UserExists = await User.findOne({ email });
        if (UserExists) {
            throw new Error('E-mail address already in use');
        }

        const user = User.create({ name, email, password });

        return user;
    }
}

export { CreateUserService };
