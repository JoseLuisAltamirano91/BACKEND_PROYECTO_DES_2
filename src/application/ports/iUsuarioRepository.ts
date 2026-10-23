import type { IUsuario } from "../../domain/models/iUsuario.js";
import type { INuevoUsuario } from "../dtos/iNuevoUsuario.js";

export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
    crear(usuario: INuevoUsuario): Promise<void>;
}