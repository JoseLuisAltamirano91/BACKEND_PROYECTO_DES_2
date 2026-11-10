
import { IPlan } from "../../domain/model/iPlan.js";
import { IPlanRepository } from "../../domain/repository/iPlanRepository.js";
import { PlanModel } from "../model/planModel.js";

export class PlanPostgresRepository implements IPlanRepository {

    async crear(plan: IPlan): Promise<IPlan> {
        const maximo = await PlanModel.max("cplan");
        const cplan = Number(maximo ?? 0) + 1;

        const nuevo = await PlanModel.create({ ...plan, cplan });
        return nuevo.get({ plain: true }) as IPlan;
    }

    async listarPorUsuario(cusuario: string): Promise<IPlan[]> {
        const planes = await PlanModel.findAll({
            where: { cusuario },
            order: [["cplan", "DESC"]]
        });
        return planes.map(plan => plan.get({ plain: true }) as IPlan);
    }

    async buscarPorId(cplan: number): Promise<IPlan | null> {
        const plan = await PlanModel.findByPk(cplan);
        return plan ? plan.get({ plain: true }) as IPlan : null;
    }

    async actualizar(cplan: number, datos: Partial<IPlan>): Promise<IPlan | null> {
        const plan = await PlanModel.findByPk(cplan);
        if (!plan) return null;

        await plan.update(datos);
        return plan.get({ plain: true }) as IPlan;
    }
}
