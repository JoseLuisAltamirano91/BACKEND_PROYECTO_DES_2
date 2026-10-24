import type { INegocio } from "./iNegocio.js";
import {IDatosNegocio} from "./iDatosNegocio.js";

export interface INegocioRepository {
    crear(
        cusuario: string,
        datos: IDatosNegocio
    ): Promise<INegocio>;

    listarPorUsuario(cusuario: string): Promise<INegocio[]>;

    actualizar(
        cnegocio: number,
        cusuario: string,
        datos: IDatosNegocio
    ): Promise<INegocio | null>;
}