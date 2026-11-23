
import { IProducto } from "../model/iProducto.js";

export interface IProductoRepository {
    crear(producto: IProducto): Promise<IProducto>;
    listarPorSucursal(csucursal: number): Promise<IProducto[]>;
    buscarPorId(id: string): Promise<IProducto | null>;
    actualizar(id: string, producto: Partial<IProducto>): Promise<IProducto | null>;
    eliminar(id: string): Promise<boolean>;
}
