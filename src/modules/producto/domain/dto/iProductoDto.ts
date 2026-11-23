
export interface IProductoDto {
    csucursal: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    categoria?: string;
    imagenes?: string[];
    disponible?: boolean;
}
