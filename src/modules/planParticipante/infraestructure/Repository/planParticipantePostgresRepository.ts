
import { IPlanParticipante } from "../../domain/model/iPlanParticipante.js";
import { IPlanParticipanteRepository } from "../../domain/repository/iPlanParticipanteRepository.js";
import { PlanParticipanteModel } from "../model/planParticipanteModel.js";
import { UsuarioModel } from "../../../usuario/infrastructure/model/usuarioModel.js";
import { Op, type Transaction } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import { PlanModel } from "../../../plan/infraestructure/model/planModel.js";

export class PlanParticipantePostgresRepository implements IPlanParticipanteRepository {

    async crear(participante: IPlanParticipante): Promise<IPlanParticipante> {
        return sequelize.transaction(async transaction => {
            const plan = await this.bloquearPlan(participante.cplan, transaction);

            if (participante.estado === "CONFIRMADO")
                await this.validarCupo(plan, participante.cusuario, transaction);

            const nuevo = await PlanParticipanteModel.create({ ...participante }, { transaction });
            return nuevo.get({ plain: true }) as IPlanParticipante;
        });
    }

    async listarPorPlan(cplan: number): Promise<IPlanParticipante[]> {
        const participantes = await PlanParticipanteModel.findAll({
            where: { cplan },
            include: [{
                model: UsuarioModel,
                as: "usuario",
                attributes: ["nombres", "apellidos"]
            }],
            order: [["fingreso", "ASC"]]
        });

        return participantes.map(p =>
            p.get({ plain: true }) as IPlanParticipante
        );
    }

    async buscar(cplan: number, cusuario: string): Promise<IPlanParticipante | null> {
        const participante = await PlanParticipanteModel.findOne({
            where: { cplan, cusuario }
        });
        return participante ? participante.get({ plain: true }) as IPlanParticipante : null;
    }

    async actualizar(cplan: number, cusuario: string, datos: Partial<IPlanParticipante>): Promise<IPlanParticipante | null> {
        return sequelize.transaction(async transaction => {
            const plan = await this.bloquearPlan(cplan, transaction);
            const participante = await PlanParticipanteModel.findOne({
                where: { cplan, cusuario },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!participante) return null;

            if (datos.estado === "CONFIRMADO" && participante.estado !== "CONFIRMADO")
                await this.validarCupo(plan, cusuario, transaction);

            await participante.update(datos, { transaction });
            return participante.get({ plain: true }) as IPlanParticipante;
        });
    }

    async eliminar(cplan: number, cusuario: string): Promise<boolean> {
        const eliminados = await PlanParticipanteModel.destroy({
            where: { cplan, cusuario }
        });
        return eliminados > 0;
    }

    async listarPorUsuario(cusuario: string): Promise<IPlanParticipante[]> {
        const participantes = await PlanParticipanteModel.findAll({
            where: { cusuario },
            order: [["cplan", "DESC"]]
        });

        return participantes.map(participante =>
            participante.get({ plain: true }) as IPlanParticipante
        );
    }

    private async bloquearPlan(cplan: number, transaction: Transaction): Promise<PlanModel> {
        const plan = await PlanModel.findByPk(cplan, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!plan) throw new Error("El plan no existe");
        return plan;
    }

    private async validarCupo(plan: PlanModel, cusuario: string, transaction: Transaction): Promise<void> {
        if (plan.estado !== "PLANIFICADO")
            throw new Error("Solo puedes inscribirte en un plan planificado");

        if (plan.cupomaximo == null || cusuario === plan.cusuario) return;

        const inscritos = await PlanParticipanteModel.count({
            where: {
                cplan: plan.cplan,
                estado: "CONFIRMADO",
                cusuario: { [Op.ne]: plan.cusuario }
            },
            transaction
        });

        if (inscritos >= plan.cupomaximo)
            throw new Error("No hay cupos disponibles");
    }
}
