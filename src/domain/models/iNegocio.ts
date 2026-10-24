export interface INegocio {
    cnegocio: number;
    cusuario: string;
    nombre: string | null;
    descripcion: string | null;
    telefono: string | null;
    correo: string | null;
    activo: boolean;
    fcreacion: number | null;
    fingreso: Date | null;
    fmodificacion: Date | null;
    cusuarioing: string | null;
    cusuariomod: string | null;
}