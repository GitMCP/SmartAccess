import mongoose from '../database/index';
const { Schema } = mongoose;

export const vehicleSchema = new Schema({
    plate: {
        type: String,
        unique: true,
        required: true,
    },
    color: {
        type: String,
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
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

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
