export interface IPreferenciaUsuario {
    cpreferencia: number;
    cusuario: string;
    presupuestomax: number | null;
    distanciamax: number | null;
    tipocompania: string | null;
    activo: boolean | null;
    fingreso: Date | null;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;
}