export interface IActividadDetalle {
    nombre: string;
    descripcion: string | null;
    hora: string | null;
}

export interface IDetallePlan {
    cplan: number;
    descripcionAmpliada: string | null;
    publicoObjetivo: string[];
    actividades: IActividadDetalle[];
    requisitos: string[];
    recomendaciones: string[];
}