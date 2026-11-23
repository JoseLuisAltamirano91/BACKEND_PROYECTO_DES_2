import type { INegocio } from "../model/iNegocio.js";
import {INegocioDto} from "../dto/iNegocioDto.js";

export interface INegocioRepository {
    crear(
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio>;

    listarPorUsuario(cusuario: string): Promise<INegocio[]>;

    actualizar(
        cnegocio: number,
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio | null>;

    perteneceAUsuario(cnegocio: number, cusuario: string): Promise<boolean>;
}