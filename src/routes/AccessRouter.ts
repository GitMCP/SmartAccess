import { Router } from 'express';
import { Access } from '../models/Access';
import { CreateAccessService } from '../services/CreateAccessService';

const AccessRouter = Router();

AccessRouter.get('/:last?', async (req, res) => {
    const io = req.app.get('socketio');
    const { last } = req.query;
    if (last) {
        const [access] = await Access.find().sort({ date: -1 }).limit(1);
        io.emit('LAST_VEHICLE', {
            plate: access.vehicle.plate,
            model: `${access.vehicle.brand} ${access.vehicle.model}`,
        });
        return res.status(200).json(access);
    }
    const access = await Access.find({ where: { deleted_at: null } }).sort({
        date: -1,
    });

    return res.status(200).json(access);
});

AccessRouter.post('/', async (req, res) => {
    const io = req.app.get('socketio');
    try {
        const { plate } = req.body;
        const createAccess = new CreateAccessService();

        const access = await createAccess.execute({ vehicle: plate });
        io.emit('LAST_VEHICLE', {
            plate: access.vehicle.plate,
            model: `${access.vehicle.brand} ${access.vehicle.model}`,
        });
        res.json(access);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
});

export default AccessRouter;
