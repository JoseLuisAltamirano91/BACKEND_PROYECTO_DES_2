import { IPlan } from "../model/iPlan.js";

export interface IPlanRepository {
    crear(plan: IPlan): Promise<IPlan>;
    listarPorUsuario(cusuario: string): Promise<IPlan[]>;
    buscarPorId(cplan: number): Promise<IPlan | null>;
    actualizar(cplan: number, plan: Partial<IPlan>): Promise<IPlan | null>;
}