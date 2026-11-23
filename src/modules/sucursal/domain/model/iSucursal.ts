export interface ISucursal {
    csucursal: number;
    cnegocio: number;
    nombre: string;
    direccion: string;
    latitud: string | null;
    longitud: string | null;
    activo: boolean;
    fingreso: Date;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;
    telefono: string | null;
}