import type { IInteresRepository } from "../../domain/repository/iInteresRepository.js";
import type { IInteresDto } from "../../domain/dto/iInteresDto.js";
import type { IInteres } from "../../domain/model/iInteres.js";
import { InteresModel } from "../model/interesModel.js";

export class InteresPostgresRepository implements IInteresRepository {

    async crear(datos: IInteresDto, cusuario: string): Promise<IInteres> {

        const ultimo = await InteresModel.max("cinteres");
        const cinteres = Number(ultimo ?? 0) + 1;

        if (cinteres > 99999) {
            throw new Error("Se alcanzó el límite de códigos de interés");
        }

        const interes = await InteresModel.create({
            cinteres,
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion ?? null,
            activo: datos.activo ?? true,
            fingreso: new Date(),
            cusuarioing: cusuario
        });

        return this.convertir(interes);
    }

    async listar(): Promise<IInteres[]> {

        const intereses = await InteresModel.findAll({
            order: [["cinteres", "ASC"]]
        });

        return intereses.map(interes => this.convertir(interes));
    }

    async actualizar(
        cinteres: number,
        datos: IInteresDto,
        cusuario: string
    ): Promise<IInteres | null> {

        const interes = await InteresModel.findByPk(cinteres);

        if (!interes) return null;

        await interes.update({
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion,
            activo: datos.activo,
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });

        return this.convertir(interes);
    }

    private convertir(modelo: InteresModel): IInteres {
        const datos = modelo.get({ plain: true });

        return {
            ...datos,
            cinteres: Number(datos.cinteres)
        } as IInteres;
    }
}