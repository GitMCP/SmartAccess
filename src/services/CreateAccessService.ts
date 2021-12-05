import { Access } from '../models/Access';
import { Vehicle } from '../models/Vehicle';

interface Request {
    vehicle: {} | string;
}

class CreateAccessService {
    public async execute({ vehicle }: Request): Promise<any> {
        if (typeof vehicle === 'string') {
            const foundVehicle = await Vehicle.findOne({ plate: vehicle });
            const access = await Access.create({
                vehicle: foundVehicle,
                date: new Date(),
            });
            return access;
        }
        const access = await Access.create({
            vehicle,
            date: new Date(),
        });
        return access;
    }
}

export { CreateAccessService };
