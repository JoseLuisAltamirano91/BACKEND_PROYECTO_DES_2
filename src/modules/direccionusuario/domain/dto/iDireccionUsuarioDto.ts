export interface IDireccionUsuarioDto {
    pais?: number | null;
    provincia?: number | null;
    canton?: number | null;
    ciudad?: number | null;
    parroquia?: number | null;
    sector?: number | null;
    direccion?: string | null;
    principal?: boolean | null;
}