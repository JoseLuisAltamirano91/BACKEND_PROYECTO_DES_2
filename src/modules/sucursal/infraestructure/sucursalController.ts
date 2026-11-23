import type { Request, Response } from "express";
import type { SucursalUseCase } from "../application/useCase/sucursalUseCase.js";

export class SucursalController {
    constructor(private readonly useCase: SucursalUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        const cusuario = this.obtenerUsuario(res);
        if (!cusuario) return;

        try {
            const sucursal = await this.useCase.crear(Number(req.params.cnegocio), cusuario, req.body);
            res.status(201).json({ mensaje: "Sucursal creada correctamente", sucursal });
        } catch (error) {
            this.responderError(res, error);
        }
    };

    listarPorNegocio = async (req: Request, res: Response): Promise<void> => {
        const cusuario = this.obtenerUsuario(res);
        if (!cusuario) return;

        try {
            const sucursales = await this.useCase.listarPorNegocio(Number(req.params.cnegocio), cusuario);
            res.json({ sucursales });
        } catch (error) {
            this.responderError(res, error);
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        const cusuario = this.obtenerUsuario(res);
        if (!cusuario) return;

        try {
            const sucursal = await this.useCase.actualizar(
                Number(req.params.csucursal), Number(req.params.cnegocio), cusuario, req.body
            );
            if (!sucursal) {
                res.status(404).json({ mensaje: "Sucursal no encontrada" });
                return;
            }
            res.json({ mensaje: "Sucursal actualizada correctamente", sucursal });
        } catch (error) {
            this.responderError(res, error);
        }
    };

    private obtenerUsuario(res: Response): string | undefined {
        const cusuario: unknown = res.locals.usuario?.cusuario;
        if (typeof cusuario === "string" && cusuario.trim()) return cusuario;
        res.status(401).json({ mensaje: "Se requiere autenticación" });
    }

    private responderError(res: Response, error: unknown): void {
        const mensaje = error instanceof Error ? error.message : "";
        if (mensaje === "Solo puedes administrar las sucursales de tus negocios") {
            res.status(403).json({ mensaje });
            return;
        }
        if (/^(El código de (negocio|sucursal) es inválido|El nombre de la sucursal debe |La dirección debe |Debes enviar la latitud y la longitud juntas|La (latitud|longitud) debe )/.test(mensaje)) {
            res.status(400).json({ mensaje });
            return;
        }
        res.status(500).json({ mensaje: "Error al procesar la solicitud de sucursales" });
    }
}
