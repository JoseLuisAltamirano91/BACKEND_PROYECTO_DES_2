import {IUsuario} from "./iUsuario.js";
import {INuevoUsuario} from "./iNuevoUsuario.js";


export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
    crear(usuario: INuevoUsuario): Promise<void>;
}