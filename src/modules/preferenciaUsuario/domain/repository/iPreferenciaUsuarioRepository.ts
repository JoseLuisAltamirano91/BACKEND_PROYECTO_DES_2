import type { IPreferenciaUsuario } from "../model/iPreferenciaUsuario.js";
import type { IPreferenciaUsuarioDto } from "../dto/iPreferenciaUsuarioDto.js";

export interface IPreferenciaUsuarioRepository {

    crear(
        cusuario: string,
        datos: IPreferenciaUsuarioDto
    ): Promise<IPreferenciaUsuario>;

    obtenerPorUsuario(
        cusuario: string
    ): Promise<IPreferenciaUsuario | null>;

    actualizar(
        cusuario: string,
        datos: IPreferenciaUsuarioDto
    ): Promise<IPreferenciaUsuario | null>;
}