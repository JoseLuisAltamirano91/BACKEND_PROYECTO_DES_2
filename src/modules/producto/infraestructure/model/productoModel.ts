
import mongoose, { Schema } from "mongoose";

const ProductoSchema = new Schema(
    {
        csucursal: {
            type: Number,
            required: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        categoria: {
            type: String
        },
        imagenes: {
            type: [String],
            default: []
        },
        disponible: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: {
            createdAt: "fingreso",
            updatedAt: "fmodificacion"
        },
        versionKey: false
    }
);

ProductoSchema.index({ csucursal: 1 });

export const ProductoModel = mongoose.model("Producto", ProductoSchema);
