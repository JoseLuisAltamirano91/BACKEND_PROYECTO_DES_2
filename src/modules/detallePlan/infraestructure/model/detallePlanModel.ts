
import { Schema, model } from "mongoose";

const ActividadDetalleSchema = new Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, default: null },
        hora: { type: String, default: null }
    },
    { _id: false }
);

const DetallePlanSchema = new Schema(
    {
        cplan: {
            type: Number,
            required: true,
            unique: true
        },
        descripcionAmpliada: {
            type: String,
            default: null
        },
        publicoObjetivo: {
            type: [String],
            default: []
        },
        actividades: {
            type: [ActividadDetalleSchema],
            default: []
        },
        requisitos: {
            type: [String],
            default: []
        },
        recomendaciones: {
            type: [String],
            default: []
        }
    },
    {
        collection: "detalleplanes",
        versionKey: false
    }
);

export const DetallePlanModel = model("DetallePlan", DetallePlanSchema);
