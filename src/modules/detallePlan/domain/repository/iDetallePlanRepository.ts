
import type { IDetallePlan } from "../model/iDetallePlan.js";
import type { IDetallePlanDto } from "../dto/iDetallePlanDto.js";

export interface IDetallePlanRepository {
    crear(cplan: number, datos: IDetallePlanDto): Promise<IDetallePlan>;
    buscarPorPlan(cplan: number): Promise<IDetallePlan | null>;
    buscarPorPlanes(cplanes: number[]): Promise<IDetallePlan[]>;
    actualizar(cplan: number, datos: IDetallePlanDto): Promise<IDetallePlan | null>;
}
