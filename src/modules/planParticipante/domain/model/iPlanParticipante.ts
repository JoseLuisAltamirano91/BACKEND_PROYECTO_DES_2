export interface IPlanParticipante {
    cplan: number;
    cusuario: string;
    estado: string;
    fingreso: Date | null;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;

    usuario?: {
        nombres: string | null;
        apellidos: string | null;
    } | null;
}