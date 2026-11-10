import type { IRol } from "./iRol.js";

export interface IUsuario {
    cusuario: string;
    nombres: string;
    apellidos: string;
    correo: string;
    passwordHash: string;
    activo: boolean;
    roles: IRol[];
}