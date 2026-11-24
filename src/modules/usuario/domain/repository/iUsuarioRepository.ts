import type { IUsuario } from "../model/iUsuario.js";
import type { INuevoUsuarioDto } from "../dto/iNuevoUsuarioDto.js";

export type PerfilUsuario = Pick<IUsuario, "cusuario" | "nombres" | "apellidos" | "correo"> & {
    telefono: string | null;
};

export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
    crear(usuario: INuevoUsuarioDto): Promise<void>;
    buscarPerfil(cusuario: string): Promise<PerfilUsuario | null>;
    actualizarPerfil(
        cusuario: string,
        nombres: string,
        apellidos: string,
        telefono?: string | null
    ): Promise<PerfilUsuario | null>;
}