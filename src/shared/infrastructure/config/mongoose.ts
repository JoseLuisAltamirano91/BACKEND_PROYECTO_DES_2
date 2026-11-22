
import mongoose from "mongoose";
import "dotenv/config";

export async function conectarMongoDB(): Promise<void> {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("No se ha configurado MONGO_URI");
    }

    await mongoose.connect(uri);
    console.log("MongoDB conectado correctamente");
}
