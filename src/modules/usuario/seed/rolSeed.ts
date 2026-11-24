import { RolModel } from "../infrastructure/model/rolModel.js";

const roles = [
    { crol: 1, nombre: "USUARIO", descripcion: "Usuario de la aplicacion" },
    { crol: 2, nombre: "NEGOCIO", descripcion: "Propietario de un negocio" },
    { crol: 3, nombre: "ADMINISTRADOR", descripcion: "Administrador de la aplicacion" }
];

export async function cargarRoles(): Promise<void> {
    for (const rol of roles) {
        await RolModel.findOrCreate({
            where: { crol: rol.crol },
            defaults: {
                ...rol,
                activo: "1",
                fingreso: new Date(),
                cusuarioing: "sistema"
            }
        });
    }
}