import { Router } from 'express';
import { Vehicle } from '../models/Vehicle';
import { CreateVehicleService } from '../services/CreateVehicleService';

const VehicleRouter = Router();

VehicleRouter.get('/:id?', async (req, res) => {
    const { id } = req.query;
    if (id) {
        const user = await Vehicle.findOne({ id });

        if (!user) {
            return res.json({ message: 'User does not exist' });
        }
        return res.json(user);
    }
    const users = await Vehicle.find({ where: { deleted_at: null } });

    return res.json(users);
});

VehicleRouter.post('/', async (req, res) => {
    try {
        const { plate, color, brand, model } = req.body;

        const createVehicle = new CreateVehicleService();

        const vehicle = await createVehicle.execute({
            plate,
            color,
            brand,
            model,
        });

        res.json(vehicle);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
});

VehicleRouter.delete('/:id?', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.json({ message: 'Please submit an vehicle id' });
    }
    await Vehicle.findOneAndUpdate({ id }, { deleted_at: new Date() });

    return res.json({ message: 'Vehicle deleted' });
});

export default VehicleRouter;
