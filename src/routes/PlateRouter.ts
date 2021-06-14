import { Router } from 'express';
import axios from 'axios';
import multer from 'multer';
import multerConfig from '../config/multer';
import path from 'path';
import FormData from 'form-data';
import fs from 'fs';

const PlateRouter = Router();

function base64_encode(file: number | fs.PathLike) {
    const bitmap = fs.readFileSync(file);
    return bitmap.toString('base64');
}

PlateRouter.post('/', multer(multerConfig).single('file'), async (req, res, next) => {
    const io = req.app.get('socketio');

    const instance = axios.create({
        headers: {
            post: {
                Authorization: 'Token 4de758197c1b5fccf766110c28b9212e76bee419'
            }
        }
    })
    
    const body = {
        upload: base64_encode(req.file.path)
    };
    fs.unlinkSync(req.file.path);
    const { plate } = await (await instance.post('https://api.platerecognizer.com/v1/plate-reader/', body)).data.results[0];
    
    io.emit("FromAPI", `Veículo não cadastrado aguardando acesso. Placa: ${plate.toUpperCase()}`);

    return res.json({message: "Mensagem enviada!"});
});


export default PlateRouter;