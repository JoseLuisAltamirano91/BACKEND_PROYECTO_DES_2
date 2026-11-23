import type { ISucursal } from "../model/iSucursal.js";
import type { ISucursalDto } from "../dto/iSucursalDto.js";

export interface ISucursalRepository {
    crear(
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal>;

    listarPorNegocio(cnegocio: number): Promise<ISucursal[]>;

    actualizar(
        csucursal: number,
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal | null>;
}