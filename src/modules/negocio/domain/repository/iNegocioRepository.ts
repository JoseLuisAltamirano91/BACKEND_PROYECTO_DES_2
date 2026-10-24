import type { INegocio } from "../model/iNegocio";
import {INegocioDto} from "../dto/iNegocioDto";

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
}