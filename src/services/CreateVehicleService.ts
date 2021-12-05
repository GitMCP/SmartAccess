import { Vehicle } from '../models/Vehicle';

interface Request {
    plate: string;
    color: string;
    brand: string;
    model: string;
}

class CreateVehicleService {
    public async execute({
        plate,
        color,
        brand,
        model,
    }: Request): Promise<any> {
        if (!plate) {
            throw new Error('Missing License Plate');
        }
        const VehicleExists = await Vehicle.findOne({ plate });
        if (VehicleExists) {
            throw new Error('License plate already registered');
        }

        const vehicle = await Vehicle.create({
            plate,
            color,
            brand,
            model,
        });

        return vehicle;
    }
}

export { CreateVehicleService };
