import type { INegocio } from "../../domain/models/iNegocio.js";
import type { IRegistroNegocio } from "../dtos/iRegistroNegocio.js";

export interface INegocioRepository {
    crear(
        cusuario: string,
        datos: IRegistroNegocio
    ): Promise<INegocio>;
}