import type { INegocio } from "../../domain/models/iNegocio.js";
import type { IRegistroNegocio } from "../dtos/iRegistroNegocio.js";
import type { IActualizarNegocio } from "../dtos/iActualizarNegocio.js";

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