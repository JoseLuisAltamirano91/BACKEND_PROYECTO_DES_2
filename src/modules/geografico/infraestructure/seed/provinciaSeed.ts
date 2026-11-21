import { ProvinciaModel } from "../model/provinciaModel";

export async function cargarProvincias(): Promise<void> {
    const provincias = [
        { cprovincia: 1, nombre: "Azuay" },
        { cprovincia: 2, nombre: "Bolívar" },
        { cprovincia: 3, nombre: "Cañar" },
        { cprovincia: 4, nombre: "Carchi" },
        { cprovincia: 5, nombre: "Cotopaxi" },
        { cprovincia: 6, nombre: "Chimborazo" },
        { cprovincia: 7, nombre: "El Oro" },
        { cprovincia: 8, nombre: "Esmeraldas" },
        { cprovincia: 9, nombre: "Guayas" },
        { cprovincia: 10, nombre: "Imbabura" },
        { cprovincia: 11, nombre: "Loja" },
        { cprovincia: 12, nombre: "Los Ríos" },
        { cprovincia: 13, nombre: "Manabí" },
        { cprovincia: 14, nombre: "Morona Santiago" },
        { cprovincia: 15, nombre: "Napo" },
        { cprovincia: 16, nombre: "Pastaza" },
        { cprovincia: 17, nombre: "Pichincha" },
        { cprovincia: 18, nombre: "Tungurahua" },
        { cprovincia: 19, nombre: "Zamora Chinchipe" },
        { cprovincia: 20, nombre: "Galápagos" },
        { cprovincia: 21, nombre: "Sucumbíos" },
        { cprovincia: 22, nombre: "Orellana" },
        { cprovincia: 23, nombre: "Santo Domingo de los Tsáchilas" },
        { cprovincia: 24, nombre: "Santa Elena" }
    ];

    await ProvinciaModel.bulkCreate(
        provincias.map(provincia => ({
            cpais: 1,
            cprovincia: provincia.cprovincia,
            nombre: provincia.nombre,
            activo: 1
        })),
        { ignoreDuplicates: true }
    );
}