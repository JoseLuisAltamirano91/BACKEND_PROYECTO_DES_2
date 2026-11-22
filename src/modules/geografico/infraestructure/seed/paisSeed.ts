import { PaisModel } from "../model/paisModel.js";

export async function cargarPaises(): Promise<void> {
    await PaisModel.findOrCreate({
        where: { cpais: 1 },
        defaults: { cpais: 1, nombre: "Ecuador", activo: 1 }
    });
}