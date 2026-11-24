
export interface IPlanDto {
    nombre: string;
    descripcion?: string | null;
    fechainicio?: Date | null;
    fechafin?: Date | null;
    cinteres?: number | null;
    cnegocio?: number | null;
    csucursal?: number | null;
    costoestimado?: string | number | null;
    cupomaximo?: number | null;
    latitud?: string | number | null;
    longitud?: string | number | null;
    lugar?: string | null;
    estado?: string | null;
    publico?: number | null;
}
