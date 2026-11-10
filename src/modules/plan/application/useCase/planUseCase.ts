
import { IPlanRepository } from "../../domain/repository/iPlanRepository.js";
import { IPlanDto } from "../../domain/dto/iPlanDto.js";
import { IPlan } from "../../domain/model/iPlan.js";
import { IPlanParticipanteRepository } from "../../../planParticipante/domain/repository/iPlanParticipanteRepository.js";

export class PlanUseCase {
    constructor(
        private readonly repository: IPlanRepository,
        private readonly participanteRepository: IPlanParticipanteRepository
    ) {}

    async crear(cusuario: string, dto: IPlanDto): Promise<IPlan> {
        if (!dto.nombre?.trim()) throw new Error("El nombre del plan es obligatorio");

        if (dto.fechainicio && dto.fechafin && new Date(dto.fechafin) < new Date(dto.fechainicio))
            throw new Error("La fecha final no puede ser anterior a la inicial");

        if (dto.publico !== undefined && dto.publico !== 0 && dto.publico !== 1)
            throw new Error("El campo publico debe ser 0 o 1");

        const plan: IPlan = {
            cplan: 0,
            cusuario,
            nombre: dto.nombre.trim(),
            descripcion: dto.descripcion ?? null,
            fechainicio: dto.fechainicio ?? null,
            fechafin: dto.fechafin ?? null,
            estado: "PLANIFICADO",
            publico: dto.publico ?? 0,
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        };

        const nuevoPlan = await this.repository.crear(plan);

        await this.participanteRepository.crear({
            cplan: nuevoPlan.cplan,
            cusuario,
            estado: "CONFIRMADO",
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        });

        return nuevoPlan;
    }

    async listarPorUsuario(cusuario: string): Promise<IPlan[]> {
        return this.repository.listarPorUsuario(cusuario);
    }

    async buscarPorId(cplan: number, cusuario: string): Promise<IPlan | null> {
        const plan = await this.repository.buscarPorId(cplan);
        if (!plan || plan.cusuario !== cusuario) return null;
        return plan;
    }

    async actualizar(cplan: number, cusuario: string, dto: Partial<IPlanDto>): Promise<IPlan | null> {
        const plan = await this.buscarPorId(cplan, cusuario);
        if (!plan) return null;

        if (dto.nombre !== undefined && !dto.nombre?.trim())
            throw new Error("El nombre del plan es obligatorio");

        const fechainicio = dto.fechainicio !== undefined ? dto.fechainicio : plan.fechainicio;
        const fechafin = dto.fechafin !== undefined ? dto.fechafin : plan.fechafin;

        if (fechainicio && fechafin && new Date(fechafin) < new Date(fechainicio))
            throw new Error("La fecha final no puede ser anterior a la inicial");

        if (dto.publico !== undefined && dto.publico !== 0 && dto.publico !== 1)
            throw new Error("El campo publico debe ser 0 o 1");

        return this.repository.actualizar(cplan, {
            ...(dto.nombre !== undefined && { nombre: dto.nombre.trim() }),
            ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
            ...(dto.fechainicio !== undefined && { fechainicio: dto.fechainicio }),
            ...(dto.fechafin !== undefined && { fechafin: dto.fechafin }),
            ...(dto.estado !== undefined && { estado: dto.estado }),
            ...(dto.publico !== undefined && { publico: dto.publico }),
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });
    }
}
