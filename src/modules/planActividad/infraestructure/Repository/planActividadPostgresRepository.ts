
import { IPlanActividad } from "../../domain/model/iPlanActividad.js";
import { IPlanActividadRepository } from "../../domain/repository/iPlanActividadRepository.js";
import { PlanActividadModel } from "../model/planActividadModel.js";

export class PlanActividadPostgresRepository implements IPlanActividadRepository {

    async crear(actividad: IPlanActividad): Promise<IPlanActividad> {
        const maximo = await PlanActividadModel.max("cplanactividad");
        const cplanactividad = Number(maximo ?? 0) + 1;

        const nueva = await PlanActividadModel.create({ ...actividad, cplanactividad });
        return nueva.get({ plain: true }) as IPlanActividad;
    }

    async listarPorPlan(cplan: number): Promise<IPlanActividad[]> {
        const actividades = await PlanActividadModel.findAll({
            where: { cplan },
            order: [["orden", "ASC"], ["cplanactividad", "ASC"]]
        });
        return actividades.map(a => a.get({ plain: true }) as IPlanActividad);
    }

    async buscarPorId(cplanactividad: number): Promise<IPlanActividad | null> {
        const actividad = await PlanActividadModel.findByPk(cplanactividad);
        return actividad ? actividad.get({ plain: true }) as IPlanActividad : null;
    }

    async actualizar(cplanactividad: number, datos: Partial<IPlanActividad>): Promise<IPlanActividad | null> {
        const actividad = await PlanActividadModel.findByPk(cplanactividad);
        if (!actividad) return null;

        await actividad.update(datos);
        return actividad.get({ plain: true }) as IPlanActividad;
    }

    async eliminar(cplanactividad: number): Promise<boolean> {
        const eliminados = await PlanActividadModel.destroy({
            where: { cplanactividad }
        });
        return eliminados > 0;
    }
}
