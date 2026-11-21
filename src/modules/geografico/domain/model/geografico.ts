export interface Pais {
    cpais: number;
    nombre: string;
    activo: number;
}

export interface Provincia {
    cpais: number;
    cprovincia: number;
    nombre: string;
    activo: number;
}

export interface Canton {
    cpais: number;
    cprovincia: number;
    ccanton: number;
    nombre: string;
    activo: number;
}

export interface Parroquia {
    cpais: number;
    cprovincia: number;
    ccanton: number;
    cparroquia: number;
    nombre: string;
    activo: number;
}