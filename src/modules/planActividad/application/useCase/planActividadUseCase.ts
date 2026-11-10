
import { IPlanActividadRepository } from "../../domain/repository/iPlanActividadRepository.js";
import { IPlanActividadDto } from "../../domain/dto/iPlanActividadDto.js";
import { IPlanActividad } from "../../domain/model/iPlanActividad.js";
import { IPlanRepository } from "../../../plan/domain/repository/iPlanRepository.js";

export class PlanActividadUseCase {
    constructor(
        private readonly repository: IPlanActividadRepository,
        private readonly planRepository: IPlanRepository
    ) {}

    async crear(cusuario: string, dto: IPlanActividadDto): Promise<IPlanActividad> {
        if (!Number.isInteger(dto.cplan) || dto.cplan <= 0)
            throw new Error("El código del plan es inválido");

        if (!dto.cactividad?.trim())
            throw new Error("El código de actividad es obligatorio");

        const plan = await this.planRepository.buscarPorId(dto.cplan);
        if (!plan) throw new Error("El plan no existe");
        if (plan.cusuario !== cusuario)
            throw new Error("No puedes agregar actividades a este plan");

        if (dto.fechainicio && dto.fechafin && new Date(dto.fechafin) > new Date(dto.fechainicio)) {
            // Fechas válidas
        } else if (dto.fechainicio && dto.fechafin) {
            throw new Error("La fecha final debe ser posterior a la inicial");
        }

        const actividad: IPlanActividad = {
            cplanactividad: 0,
            cplan: dto.cplan,
            cactividad: dto.cactividad.trim(),
            orden: dto.orden ?? null,
            fechainicio: dto.fechainicio ?? null,
            fechafin: dto.fechafin ?? null,
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        };

        return this.repository.crear(actividad);
    }

    async listarPorPlan(cplan: number, cusuario: string): Promise<IPlanActividad[]> {
        const plan = await this.planRepository.buscarPorId(cplan);
        if (!plan) throw new Error("El plan no existe");

        if (Number(plan.publico) !== 1 && plan.cusuario !== cusuario)
            throw new Error("No tienes acceso a este plan");

        return this.repository.listarPorPlan(cplan);
    }

    async buscarPorId(cplanactividad: number, cusuario: string): Promise<IPlanActividad | null> {
        const actividad = await this.repository.buscarPorId(cplanactividad);
        if (!actividad) return null;

        const plan = await this.planRepository.buscarPorId(actividad.cplan);
        if (!plan || (Number(plan.publico) !== 1 && plan.cusuario !== cusuario))
            return null;

        return actividad;
    }

    async actualizar(cplanactividad: number, cusuario: string, dto: Partial<IPlanActividadDto>): Promise<IPlanActividad | null> {
        const actividad = await this.repository.buscarPorId(cplanactividad);
        if (!actividad) return null;

        const plan = await this.planRepository.buscarPorId(actividad.cplan);
        if (!plan || plan.cusuario !== cusuario)
            throw new Error("No puedes modificar actividades de este plan");

        const fechainicio = dto.fechainicio !== undefined ? dto.fechainicio : actividad.fechainicio;
        const fechafin = dto.fechafin !== undefined ? dto.fechafin : actividad.fechafin;

        if (fechainicio && fechafin && new Date(fechafin) <= new Date(fechainicio))
            throw new Error("La fecha final debe ser posterior a la inicial");

        return this.repository.actualizar(cplanactividad, {
            ...(dto.cactividad !== undefined && { cactividad: dto.cactividad.trim() }),
            ...(dto.orden !== undefined && { orden: dto.orden }),
            ...(dto.fechainicio !== undefined && { fechainicio: dto.fechainicio }),
            ...(dto.fechafin !== undefined && { fechafin: dto.fechafin }),
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });
    }

    async eliminar(cplanactividad: number, cusuario: string): Promise<boolean> {
        const actividad = await this.repository.buscarPorId(cplanactividad);
        if (!actividad) return false;

        const plan = await this.planRepository.buscarPorId(actividad.cplan);
        if (!plan || plan.cusuario !== cusuario)
            throw new Error("No puedes eliminar actividades de este plan");

        return this.repository.eliminar(cplanactividad);
    }
}
