import type { INegocio } from "./iNegocio.js";
import type { IRegistroNegocio } from "../application/dtos/iRegistroNegocio.js";
import type { IActualizarNegocio } from "../application/dtos/iActualizarNegocio.js";

export interface INegocioRepository {
    crear(
        cusuario: string,
        datos: IRegistroNegocio
    ): Promise<INegocio>;

    listarPorUsuario(cusuario: string): Promise<INegocio[]>;

    actualizar(
        cnegocio: number,
        cusuario: string,
        datos: IActualizarNegocio
    ): Promise<INegocio | null>;
}