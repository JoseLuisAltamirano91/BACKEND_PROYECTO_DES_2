export interface IPlan {
    cplan: number;
    cusuario: string;
    cinteres: number | null;
    cnegocio: number | null;
    nombre: string | null;
    descripcion: string | null;
    fechainicio: Date | null;
    fechafin: Date | null;
    costoestimado: string | null;
    latitud: string | null;
    longitud: string | null;
    lugar: string | null;
    estado: string | null;
    publico: number | null;
    fingreso: Date | null;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;

    usuario?: {
        nombres: string | null;
        apellidos: string | null;
    } | null;
}