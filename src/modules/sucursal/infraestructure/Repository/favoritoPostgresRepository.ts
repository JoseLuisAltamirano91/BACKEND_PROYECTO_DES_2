import type { ISucursal } from "../../domain/model/iSucursal.js";
import type { ISucursalDto } from "../../domain/dto/iSucursalDto.js";
import type { ISucursalRepository } from "../../domain/repository/iSucursalRepository.js";
import { SucursalModel } from "../model/sucursalModel.js";

export class SucursalPostgresRepository implements ISucursalRepository {
    async crear(
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal> {
        const sucursal = await SucursalModel.create({
            cnegocio,
            nombre: datos.nombre.trim(),
            direccion: datos.direccion.trim(),
            telefono: datos.telefono ?? null,
            latitud: datos.latitud ?? null,
            longitud: datos.longitud ?? null,
            cusuarioing: cusuario
        });

        return this.aDominio(sucursal);
    }

    async listarPorNegocio(cnegocio: number): Promise<ISucursal[]> {
        const sucursales = await SucursalModel.findAll({
            where: { cnegocio },
            order: [["csucursal", "DESC"]]
        });

        return sucursales.map(sucursal => this.aDominio(sucursal));
    }

    async actualizar(
        csucursal: number,
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal | null> {
        const [, sucursales] = await SucursalModel.update(
            {
                nombre: datos.nombre.trim(),
                direccion: datos.direccion.trim(),
                ...(datos.telefono !== undefined && { telefono: datos.telefono }),
                ...(datos.latitud !== undefined && { latitud: datos.latitud }),
                ...(datos.longitud !== undefined && { longitud: datos.longitud }),
                ...(datos.activo !== undefined && { activo: datos.activo }),
                fmodificacion: new Date(),
                cusuariomod: cusuario
            },
            {
                where: { csucursal, cnegocio },
                returning: true
            }
        );

        const sucursal = sucursales[0];
        return sucursal ? this.aDominio(sucursal) : null;
    }

    private aDominio(sucursal: SucursalModel): ISucursal {
        return {
            csucursal: sucursal.csucursal,
            cnegocio: sucursal.cnegocio,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            latitud: sucursal.latitud,
            longitud: sucursal.longitud,
            activo: Number(sucursal.activo) === 1,
            fingreso: sucursal.fingreso,
            fmodificacion: sucursal.fmodificacion,
            cusuarioing: sucursal.cusuarioing,
            cusuariomod: sucursal.cusuariomod
        };
    }
}