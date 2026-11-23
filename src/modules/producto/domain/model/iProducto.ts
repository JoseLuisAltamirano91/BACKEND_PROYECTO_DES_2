export interface IProducto {
    id?: string;
    csucursal: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    categoria?: string;
    imagenes?: string[];
    disponible: boolean;
    fingreso?: Date;
    fmodificacion?: Date;
}