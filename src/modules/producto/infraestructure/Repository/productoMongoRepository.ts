
import { IProducto } from "../../domain/model/iProducto.js";
import { IProductoRepository } from "../../domain/repository/iProductoRepository.js";
import { ProductoModel } from "../model/productoModel.js";

export class ProductoMongoRepository implements IProductoRepository {

    async crear(producto: IProducto): Promise<IProducto> {
        const nuevo = new ProductoModel({
            csucursal: producto.csucursal,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            imagenes: producto.imagenes ?? [],
            disponible: producto.disponible
        });

        await nuevo.save();
        return this.mapear(nuevo);
    }

    async listarPorSucursal(csucursal: number): Promise<IProducto[]> {
        const productos = await ProductoModel.find({ csucursal });
        return productos.map(producto => this.mapear(producto));
    }

    async buscarPorId(id: string): Promise<IProducto | null> {
        const producto = await ProductoModel.findById(id);
        return producto ? this.mapear(producto) : null;
    }

    async actualizar(id: string, producto: Partial<IProducto>): Promise<IProducto | null> {
        const actualizado = await ProductoModel.findByIdAndUpdate(id, producto, {
            new: true,
            runValidators: true
        });
        return actualizado ? this.mapear(actualizado) : null;
    }

    async eliminar(id: string): Promise<boolean> {
        const eliminado = await ProductoModel.findByIdAndDelete(id);
        return eliminado !== null;
    }

    private mapear(producto: any): IProducto {
        return {
            id: producto._id.toString(),
            csucursal: producto.csucursal,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            imagenes: producto.imagenes,
            disponible: producto.disponible,
            fingreso: producto.fingreso,
            fmodificacion: producto.fmodificacion
        };
    }
}
