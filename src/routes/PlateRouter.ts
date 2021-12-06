import { Router } from 'express';
import axios from 'axios';
import multer from 'multer';
import multerConfig from '../config/multer';
import path from 'path';
import FormData from 'form-data';
import fs from 'fs';
import { Vehicle } from '../models/Vehicle';
import { CreateAccessService } from '../services/CreateAccessService';

const PlateRouter = Router();

function base64_encode(file: number | fs.PathLike) {
    const bitmap = fs.readFileSync(file);
    return bitmap.toString('base64');
}

PlateRouter.post('/', multer(multerConfig).single('file'), async (req, res) => {
    const io = req.app.get('socketio');

    const instance = axios.create({
        headers: {
            post: {
                Authorization: 'Token 4de758197c1b5fccf766110c28b9212e76bee419',
            },
        },
    });

    const body = {
        upload: base64_encode(req.file.path),
    };
    fs.unlinkSync(req.file.path);
    const plate = await (
        await instance.post(
            'https://api.platerecognizer.com/v1/plate-reader/',
            body,
        )
    ).data.results[0].plate.toUpperCase();

    const knownVehicle = await Vehicle.findOne({ plate });

    if (knownVehicle) {
        const createAccess = new CreateAccessService();
        await createAccess.execute({ vehicle: knownVehicle });
        io.emit('LAST_VEHICLE', {
            plate: knownVehicle.plate,
            model: `${knownVehicle.brand} ${knownVehicle.model}`,
        });
        await axios.get('https://smartaccess-proxy-api.herokuapp.com/');
        return res.status(200).json({
            action: 'liberar',
            message: 'Veículo já cadastrado, liberar cancela',
        });
    }

    io.emit('UNKNOWN_VEHICLE', plate.toUpperCase());

    return res.status(200).json({
        action: 'aguardar',
        message: 'Veículo não cadastrado, aguardar cadastro',
    });
});

export default PlateRouter;
