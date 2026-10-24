import type { INegocio } from "./iNegocio.js";
import type { IDatosNegocioDto } from "../application/dtos/iDatosNegocioDto";

export interface INegocioRepository {
    crear(
        cusuario: string,
        datos: IDatosNegocioDto
    ): Promise<INegocio>;

    listarPorUsuario(cusuario: string): Promise<INegocio[]>;

    actualizar(
        cnegocio: number,
        cusuario: string,
        datos: IDatosNegocioDto
    ): Promise<INegocio | null>;
}