import mongoose from '../database/index';
import { vehicleSchema } from './Vehicle';
const { Schema } = mongoose;

const accessSchema = new Schema({
    vehicle: {
        type: vehicleSchema,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: Date,
});

export const Access = mongoose.model('Access', accessSchema);
