
import { IPlanParticipante } from "../model/iPlanParticipante.js";

export interface IPlanParticipanteRepository {
    crear(participante: IPlanParticipante): Promise<IPlanParticipante>;
    listarPorPlan(cplan: number): Promise<IPlanParticipante[]>;
    buscar(cplan: number, cusuario: string): Promise<IPlanParticipante | null>;
    actualizar(cplan: number, cusuario: string, datos: Partial<IPlanParticipante>): Promise<IPlanParticipante | null>;
    eliminar(cplan: number, cusuario: string): Promise<boolean>;
}
