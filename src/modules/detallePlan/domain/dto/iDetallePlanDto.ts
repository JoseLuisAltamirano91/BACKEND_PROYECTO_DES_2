import type { IActividadDetalle } from "../model/iDetallePlan.js";

export interface IDetallePlanDto {
    descripcionAmpliada?: string | null;
    publicoObjetivo?: string[];
    actividades?: IActividadDetalle[];
    requisitos?: string[];
    recomendaciones?: string[];
}