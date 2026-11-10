
export interface IPlanDto {
    nombre: string;
    descripcion?: string | null;
    fechainicio?: Date | null;
    fechafin?: Date | null;
    estado?: string | null;
    publico?: number | null;
}
