
import type { IDetallePlanRepository } from "../../domain/repository/iDetallePlanRepository.js";
import type { IDetallePlanDto } from "../../domain/dto/iDetallePlanDto.js";
import type { IDetallePlan } from "../../domain/model/iDetallePlan.js";
import { DetallePlanModel } from "../model/detallePlanModel.js";

export class DetallePlanMongoRepository implements IDetallePlanRepository {

    async crear(cplan: number, datos: IDetallePlanDto): Promise<IDetallePlan> {
        const detalle = await DetallePlanModel.create({
            cplan,
            ...datos
        });

        return this.convertir(detalle);
    }

    async buscarPorPlan(cplan: number): Promise<IDetallePlan | null> {
        const detalle = await DetallePlanModel.findOne({ cplan });

        return detalle ? this.convertir(detalle) : null;
    }


    async buscarPorPlanes(cplanes: number[]): Promise<IDetallePlan[]> {
        if (cplanes.length === 0) return [];

        const detalles = await DetallePlanModel.find({
            cplan: { $in: cplanes }
        });

        return detalles.map(detalle => this.convertir(detalle));
    }


    async actualizar(cplan: number, datos: IDetallePlanDto): Promise<IDetallePlan | null> {
        const detalle = await DetallePlanModel.findOneAndUpdate(
            { cplan },
            { $set: datos },
            { new: true, runValidators: true }
        );

        return detalle ? this.convertir(detalle) : null;
    }

    private convertir(modelo: InstanceType<typeof DetallePlanModel>): IDetallePlan {
        const datos = modelo.toObject();

        return {
            cplan: datos.cplan,
            descripcionAmpliada: datos.descripcionAmpliada ?? null,
            publicoObjetivo: datos.publicoObjetivo ?? [],
            actividades: (datos.actividades ?? []).map(actividad => ({
                nombre: actividad.nombre,
                descripcion: actividad.descripcion ?? null,
                hora: actividad.hora ?? null
            })),
            requisitos: datos.requisitos ?? [],
            recomendaciones: datos.recomendaciones ?? []
        };
    }
}
