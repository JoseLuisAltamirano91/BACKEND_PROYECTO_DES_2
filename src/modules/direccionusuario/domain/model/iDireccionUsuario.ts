export interface IDireccionUsuario {
    cdireccion: number;
    cusuario: string;
    pais: number | null;
    provincia: number | null;
    canton: number | null;
    ciudad: number | null;
    parroquia: number | null;
    sector: number | null;
    direccion: string | null;
    latitud: number | null;
    longitud: number | null;
    principal: boolean | null;
    fingreso: Date | null;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;
}