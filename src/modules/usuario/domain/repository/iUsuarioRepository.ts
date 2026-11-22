import {IUsuario} from "../model/iUsuario.js";
import {INuevoUsuarioDto} from "../dto/iNuevoUsuarioDto.js";


export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
    crear(usuario: INuevoUsuarioDto): Promise<void>;
}