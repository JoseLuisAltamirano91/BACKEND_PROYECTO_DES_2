import type { IInteresUsuarioRepository } from "../../domain/repository/iInteresUsuarioRepository.js";
import type { IInteresUsuario } from "../../domain/model/iInteresUsuario.js";
import { InteresUsuarioModel } from "../model/interesUsuarioModel.js";

export class InteresUsuarioPostgresRepository implements IInteresUsuarioRepository {

    async agregar(
        cusuario: string,
        cinteres: number
    ): Promise<IInteresUsuario> {

        const interes = await InteresUsuarioModel.create({
            cusuario,
            cinteres,
            fingreso: new Date(),
            cusuarioing: cusuario
        });

        return this.convertir(interes);
    }

    async listarPorUsuario(
        cusuario: string
    ): Promise<IInteresUsuario[]> {

        const intereses = await InteresUsuarioModel.findAll({
            where: { cusuario },
            order: [["cinteres", "ASC"]]
        });

        return intereses.map(interes => this.convertir(interes));
    }

    async eliminar(
        cusuario: string,
        cinteres: number
    ): Promise<boolean> {

        const eliminados = await InteresUsuarioModel.destroy({
            where: { cusuario, cinteres }
        });

        return eliminados > 0;
    }

    private convertir(modelo: InteresUsuarioModel): IInteresUsuario {
        const datos = modelo.get({ plain: true });

        return {
            ...datos,
            cinteres: Number(datos.cinteres)
        } as IInteresUsuario;
    }
}