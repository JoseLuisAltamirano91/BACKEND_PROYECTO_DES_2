
export interface IPlanActividadDto {
    cplan: number;
    cactividad: string;
    orden?: number | null;
    fechainicio?: Date | null;
    fechafin?: Date | null;
}
