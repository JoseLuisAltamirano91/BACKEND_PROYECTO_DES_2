
import { IPlanParticipante } from "../../domain/model/iPlanParticipante.js";
import { IPlanParticipanteRepository } from "../../domain/repository/iPlanParticipanteRepository.js";
import { PlanParticipanteModel } from "../model/planParticipanteModel.js";

export class PlanParticipantePostgresRepository implements IPlanParticipanteRepository {

    async crear(participante: IPlanParticipante): Promise<IPlanParticipante> {
        const nuevo = await PlanParticipanteModel.create({ ...participante });
        return nuevo.get({ plain: true }) as IPlanParticipante;
    }

    async listarPorPlan(cplan: number): Promise<IPlanParticipante[]> {
        const participantes = await PlanParticipanteModel.findAll({
            where: { cplan },
            order: [["fingreso", "ASC"]]
        });
        return participantes.map(p => p.get({ plain: true }) as IPlanParticipante);
    }

    async buscar(cplan: number, cusuario: string): Promise<IPlanParticipante | null> {
        const participante = await PlanParticipanteModel.findOne({
            where: { cplan, cusuario }
        });
        return participante ? participante.get({ plain: true }) as IPlanParticipante : null;
    }

    async actualizar(cplan: number, cusuario: string, datos: Partial<IPlanParticipante>): Promise<IPlanParticipante | null> {
        const participante = await PlanParticipanteModel.findOne({
            where: { cplan, cusuario }
        });
        if (!participante) return null;

        await participante.update(datos);
        return participante.get({ plain: true }) as IPlanParticipante;
    }

    async eliminar(cplan: number, cusuario: string): Promise<boolean> {
        const eliminados = await PlanParticipanteModel.destroy({
            where: { cplan, cusuario }
        });
        return eliminados > 0;
    }
}
