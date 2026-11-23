
import { Request, Response } from "express";
import { ProductoUseCase } from "../application/useCase/productoUseCase.js";
import { IProductoDto } from "../domain/dto/iProductoDto.js";
import { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class ProductoController {
    constructor(private readonly useCase: ProductoUseCase) {}


    private obtenerUsuario(res: Response): string {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario?.cusuario) {
            throw new Error("Usuario no autenticado");
        }

        return usuario.cusuario;
    }


    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const cusuario = this.obtenerUsuario(res);
            const datos: IProductoDto = req.body;
            const producto = await this.useCase.crear(datos, cusuario);
            res.status(201).json(producto);
        } catch (error) {
            res.status(400).json({ mensaje: (error as Error).message });
        }
    };

    listarPorSucursal = async (req: Request, res: Response): Promise<void> => {
        try {
            const csucursal = Number(req.params.csucursal);
            const productos = await this.useCase.listarPorSucursal(csucursal);
            res.json(productos);
        } catch (error) {
            res.status(400).json({ mensaje: (error as Error).message });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const producto = await this.useCase.buscarPorId(String(req.params.id));

            if (!producto) {
                res.status(404).json({ mensaje: "Producto no encontrado" });
                return;
            }

            res.json(producto);
        } catch (error) {
            res.status(400).json({ mensaje: (error as Error).message });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        try {
            const cusuario = this.obtenerUsuario(res);
            const producto = await this.useCase.actualizar(
                String(req.params.id),
                req.body,
                cusuario
            );

            if (!producto) {
                res.status(404).json({ mensaje: "Producto no encontrado" });
                return;
            }

            res.json(producto);
        } catch (error) {
            res.status(400).json({ mensaje: (error as Error).message });
        }
    };

    eliminar = async (req: Request, res: Response): Promise<void> => {
        try {
            const cusuario = this.obtenerUsuario(res);
            const eliminado = await this.useCase.eliminar(
                String(req.params.id),
                cusuario
            );

            if (!eliminado) {
                res.status(404).json({ mensaje: "Producto no encontrado" });
                return;
            }

            res.json({ mensaje: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(400).json({ mensaje: (error as Error).message });
        }
    };
}
