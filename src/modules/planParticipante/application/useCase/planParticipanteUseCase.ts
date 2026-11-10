
import { IPlanParticipanteRepository } from "../../domain/repository/iPlanParticipanteRepository.js";
import { IPlanParticipanteDto } from "../../domain/dto/iPlanParticipanteDto.js";
import { IPlanParticipante } from "../../domain/model/iPlanParticipante.js";

export class PlanParticipanteUseCase {
    constructor(private readonly repository: IPlanParticipanteRepository) {}

    async crear(cusuario: string, dto: IPlanParticipanteDto): Promise<IPlanParticipante> {
        if (!Number.isInteger(dto.cplan) || dto.cplan <= 0)
            throw new Error("El código del plan es inválido");

        const existe = await this.repository.buscar(dto.cplan, cusuario);
        if (existe) throw new Error("El usuario ya participa en este plan");

        const participante: IPlanParticipante = {
            cplan: dto.cplan,
            cusuario,
            estado: "CONFIRMADO",
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        };

        return this.repository.crear(participante);
    }

    async listarPorPlan(cplan: number): Promise<IPlanParticipante[]> {
        return this.repository.listarPorPlan(cplan);
    }

    async buscar(cplan: number, cusuario: string): Promise<IPlanParticipante | null> {
        return this.repository.buscar(cplan, cusuario);
    }

    async actualizar(cplan: number, cusuario: string, estado: string): Promise<IPlanParticipante | null> {
        if (!["CONFIRMADO", "PENDIENTE", "CANCELADO"].includes(estado))
            throw new Error("Estado de participación inválido");

        const participante = await this.repository.buscar(cplan, cusuario);
        if (!participante) return null;

        return this.repository.actualizar(cplan, cusuario, {
            estado,
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });
    }

    async eliminar(cplan: number, cusuario: string): Promise<boolean> {
        return this.repository.eliminar(cplan, cusuario);
    }
}
