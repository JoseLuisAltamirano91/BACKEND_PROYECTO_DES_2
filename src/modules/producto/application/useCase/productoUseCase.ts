
import { IProducto } from "../../domain/model/iProducto.js";
import { IProductoDto } from "../../domain/dto/iProductoDto.js";
import { IProductoRepository } from "../../domain/repository/iProductoRepository.js";
import { ISucursalRepository } from "../../../sucursal/domain/repository/iSucursalRepository.js";
import { INegocioRepository } from "../../../negocio/domain/repository/iNegocioRepository.js";

export class ProductoUseCase {
    constructor(
        private readonly repository: IProductoRepository,
        private readonly sucursalRepository: ISucursalRepository,
        private readonly negocioRepository: INegocioRepository
    ) {}

    private async validarSucursal(csucursal: number, cusuario: string): Promise<void> {
        if (!Number.isInteger(csucursal) || csucursal <= 0) {
            throw new Error("La sucursal no es válida");
        }

        const sucursal = await this.sucursalRepository.buscarPorId(csucursal);
        if (!sucursal || !sucursal.activo) {
            throw new Error("La sucursal no existe o está inactiva");
        }

        const pertenece = await this.negocioRepository.perteneceAUsuario(
            sucursal.cnegocio,
            cusuario
        );

        if (!pertenece) {
            throw new Error("No tienes permisos para administrar esta sucursal");
        }
    }

    async crear(datos: IProductoDto, cusuario: string): Promise<IProducto> {
        await this.validarSucursal(datos.csucursal, cusuario);

        if (!datos.nombre?.trim()) {
            throw new Error("El nombre del producto es obligatorio");
        }

        if (typeof datos.precio !== "number" || !Number.isFinite(datos.precio) || datos.precio < 0) {
            throw new Error("El precio del producto no es válido");
        }

        return this.repository.crear({
            csucursal: datos.csucursal,
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion,
            precio: datos.precio,
            categoria: datos.categoria,
            imagenes: datos.imagenes ?? [],
            disponible: datos.disponible ?? true
        });
    }

    async listarPorSucursal(csucursal: number): Promise<IProducto[]> {
        if (!Number.isInteger(csucursal) || csucursal <= 0) {
            throw new Error("La sucursal no es válida");
        }

        return this.repository.listarPorSucursal(csucursal);
    }

    async buscarPorId(id: string): Promise<IProducto | null> {
        if (!id?.trim()) {
            throw new Error("El identificador del producto es obligatorio");
        }

        return this.repository.buscarPorId(id);
    }

    async actualizar(
        id: string,
        datos: Partial<IProductoDto>,
        cusuario: string
    ): Promise<IProducto | null> {
        const producto = await this.buscarPorId(id);
        if (!producto) return null;

        await this.validarSucursal(producto.csucursal, cusuario);

        if (datos.csucursal !== undefined && datos.csucursal !== producto.csucursal) {
            throw new Error("No se permite cambiar la sucursal del producto");
        }

        if (datos.nombre !== undefined && (typeof datos.nombre !== "string" || !datos.nombre.trim())) {
            throw new Error("El nombre del producto es obligatorio");
        }

        if (datos.precio !== undefined &&
            (typeof datos.precio !== "number" || !Number.isFinite(datos.precio) || datos.precio < 0)) {
            throw new Error("El precio del producto no es válido");
        }

        const { csucursal, ...cambios } = datos;
        return this.repository.actualizar(id, cambios);
    }

    async eliminar(id: string, cusuario: string): Promise<boolean> {
        const producto = await this.buscarPorId(id);
        if (!producto) return false;

        await this.validarSucursal(producto.csucursal, cusuario);
        return this.repository.eliminar(id);
    }
}
