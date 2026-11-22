
import type { Request, Response } from "express";
import { DetallePlanUseCase } from "../application/useCase/detallePlanUseCase.js";
import type { IDetallePlanDto } from "../domain/dto/iDetallePlanDto.js";
import type { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class DetallePlanController {
    constructor(
        private readonly useCase: DetallePlanUseCase
    ) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);
            const datos = req.body as IDetallePlanDto;

            const detalle = await this.useCase.crear(cplan, usuario.cusuario, datos);

            res.status(201).json({
                mensaje: "Detalle del plan registrado correctamente",
                detalle
            });
        } catch (error) {
            this.manejarError(error, res);
        }
    };

    buscarPorPlan = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            const detalle = await this.useCase.buscarPorPlan(cplan, usuario.cusuario);

            if (!detalle) {
                res.status(404).json({ mensaje: "Detalle del plan no encontrado" });
                return;
            }

            res.status(200).json({ detalle });
        } catch (error) {
            this.manejarError(error, res);
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);
            const datos = req.body as IDetallePlanDto;

            const detalle = await this.useCase.actualizar(cplan, usuario.cusuario, datos);

            res.status(200).json({
                mensaje: "Detalle del plan actualizado correctamente",
                detalle
            });
        } catch (error) {
            this.manejarError(error, res);
        }
    };

    private manejarError(error: unknown, res: Response): void {
        const mensaje = error instanceof Error ? error.message : "Error inesperado";

        if (mensaje === "Plan no encontrado" ||
            mensaje === "Plan no encontrado o no autorizado" ||
            mensaje === "Detalle del plan no encontrado") {
            res.status(404).json({ mensaje });
            return;
        }

        if (mensaje === "No tienes permiso para consultar este detalle") {
            res.status(403).json({ mensaje });
            return;
        }

        if (mensaje === "El plan ya tiene un detalle registrado") {
            res.status(409).json({ mensaje });
            return;
        }

        if (mensaje === "El codigo del plan no es valido" ||
            mensaje === "Usuario requerido") {
            res.status(400).json({ mensaje });
            return;
        }

        console.error("Error en DetallePlanController:", error);
        res.status(500).json({ mensaje: "No se pudo procesar el detalle del plan" });
    }
}
