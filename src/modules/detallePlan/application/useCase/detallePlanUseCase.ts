
import type { IDetallePlanRepository } from "../../domain/repository/iDetallePlanRepository.js";
import type { IDetallePlanDto } from "../../domain/dto/iDetallePlanDto.js";
import type { IPlanRepository } from "../../../plan/domain/repository/iPlanRepository.js";

export class DetallePlanUseCase {
    constructor(
        private readonly repository: IDetallePlanRepository,
        private readonly planRepository: IPlanRepository
    ) {}

    async crear(cplan: number, cusuario: string, datos: IDetallePlanDto) {
        await this.validarPropietario(cplan, cusuario);

        const existe = await this.repository.buscarPorPlan(cplan);
        if (existe) {
            throw new Error("El plan ya tiene un detalle registrado");
        }

        return this.repository.crear(cplan, datos);
    }

    async buscarPorPlan(cplan: number, cusuario: string) {
        this.validarPlan(cplan);

        const plan = await this.planRepository.buscarPorId(cplan);
        if (!plan) {
            throw new Error("Plan no encontrado");
        }

        if (plan.cusuario !== cusuario && Number(plan.publico) !== 1) {
            throw new Error("No tienes permiso para consultar este detalle");
        }

        return this.repository.buscarPorPlan(cplan);
    }

    async actualizar(cplan: number, cusuario: string, datos: IDetallePlanDto) {
        await this.validarPropietario(cplan, cusuario);

        const detalle = await this.repository.actualizar(cplan, datos);
        if (!detalle) {
            throw new Error("Detalle del plan no encontrado");
        }

        return detalle;
    }

    private async validarPropietario(cplan: number, cusuario: string): Promise<void> {
        this.validarPlan(cplan);

        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        const plan = await this.planRepository.buscarPorId(cplan);

        if (!plan || plan.cusuario !== cusuario) {
            throw new Error("Plan no encontrado o no autorizado");
        }
    }

    private validarPlan(cplan: number): void {
        if (!Number.isSafeInteger(cplan) || cplan <= 0) {
            throw new Error("El codigo del plan no es valido");
        }
    }
}
