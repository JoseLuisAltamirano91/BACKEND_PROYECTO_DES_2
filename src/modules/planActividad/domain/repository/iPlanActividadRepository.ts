
import { IPlanActividad } from "../model/iPlanActividad.js";

export interface IPlanActividadRepository {
    crear(actividad: IPlanActividad): Promise<IPlanActividad>;
    listarPorPlan(cplan: number): Promise<IPlanActividad[]>;
    buscarPorId(cplanactividad: number): Promise<IPlanActividad | null>;
    actualizar(cplanactividad: number, datos: Partial<IPlanActividad>): Promise<IPlanActividad | null>;
    eliminar(cplanactividad: number): Promise<boolean>;
}
