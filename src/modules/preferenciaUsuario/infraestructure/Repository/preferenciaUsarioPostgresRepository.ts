import type { IPreferenciaUsuarioRepository } from "../../domain/repository/iPreferenciaUsuarioRepository.js";
import type { IPreferenciaUsuarioDto } from "../../domain/dto/iPreferenciaUsuarioDto.js";
import type { IPreferenciaUsuario } from "../../domain/model/iPreferenciaUsuario.js";
import { PreferenciaUsuarioModel } from "../model/preferenciaUsuarioModel.js";

export class PreferenciaUsuarioPostgresRepository implements IPreferenciaUsuarioRepository {

    async crear(
        cusuario: string,
        datos: IPreferenciaUsuarioDto
    ): Promise<IPreferenciaUsuario> {

        const ultimo = await PreferenciaUsuarioModel.max("cpreferencia");
        const cpreferencia = Number(ultimo ?? 0) + 1;

        const preferencia = await PreferenciaUsuarioModel.create({
            cpreferencia,
            cusuario,
            ...datos,
            activo: datos.activo ?? true,
            fingreso: new Date(),
            cusuarioing: cusuario
        });

        return this.convertir(preferencia);
    }

    async obtenerPorUsuario(
        cusuario: string
    ): Promise<IPreferenciaUsuario | null> {

        const preferencia = await PreferenciaUsuarioModel.findOne({
            where: { cusuario }
        });

        return preferencia ? this.convertir(preferencia) : null;
    }

    async actualizar(
        cusuario: string,
        datos: IPreferenciaUsuarioDto
    ): Promise<IPreferenciaUsuario | null> {

        const preferencia = await PreferenciaUsuarioModel.findOne({
            where: { cusuario }
        });

        if (!preferencia) return null;

        await preferencia.update({
            ...datos,
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });

        return this.convertir(preferencia);
    }

    private convertir(modelo: PreferenciaUsuarioModel): IPreferenciaUsuario {
        const datos = modelo.get({ plain: true });

        return {
            ...datos,
            cpreferencia: Number(datos.cpreferencia),
            presupuestomax: datos.presupuestomax === null
                ? null : Number(datos.presupuestomax),
            distanciamax: datos.distanciamax === null
                ? null : Number(datos.distanciamax)
        } as IPreferenciaUsuario;
    }
}