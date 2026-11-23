export interface ISucursalDto {
    nombre: string;
    direccion: string;
    latitud?: string | number | null;
    longitud?: string | number | null;
    activo?: 0 | 1;
    telefono?: string | null;
}