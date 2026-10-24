import {IUsuario} from "../model/iUsuario";
import {INuevoUsuarioDto} from "../dto/iNuevoUsuarioDto";


export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
    crear(usuario: INuevoUsuarioDto): Promise<void>;
}