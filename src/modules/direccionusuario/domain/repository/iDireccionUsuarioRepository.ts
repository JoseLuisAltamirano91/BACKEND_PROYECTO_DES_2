import {IDireccionUsuario} from "../model/iDireccionUsuario.js";
import {IDireccionUsuarioDto} from "../dto/iDireccionUsuarioDto.js";

export interface IDireccionUsuarioRepository {
    crear(
        cusuario: string,
        datos: IDireccionUsuarioDto
    ): Promise<IDireccionUsuario>;

    listarPorUsuario(cusuario: string): Promise<IDireccionUsuario[]>;

    actualizar(
        cdireccion: number,
        cusuario: string,
        datos: IDireccionUsuarioDto
    ): Promise<IDireccionUsuario | null>;
}