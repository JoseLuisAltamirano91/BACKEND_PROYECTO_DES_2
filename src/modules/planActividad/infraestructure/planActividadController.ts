
import { Request, Response } from "express";
import { PlanActividadUseCase } from "../application/useCase/planActividadUseCase.js";
import { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class PlanActividadController {
    constructor(private readonly useCase: PlanActividadUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const actividad = await this.useCase.crear(usuario.cusuario, req.body);
            res.status(201).json(actividad);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    listarPorPlan = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const actividades = await this.useCase.listarPorPlan(cplan, usuario.cusuario);
            res.json(actividades);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplanactividad = Number(req.params.cplanactividad);

            if (!Number.isInteger(cplanactividad) || cplanactividad <= 0) {
                res.status(400).json({ mensaje: "Código de actividad inválido" });
                return;
            }

            const actividad = await this.useCase.buscarPorId(cplanactividad, usuario.cusuario);
            if (!actividad) {
                res.status(404).json({ mensaje: "Actividad del plan no encontrada" });
                return;
            }

            res.json(actividad);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplanactividad = Number(req.params.cplanactividad);

            if (!Number.isInteger(cplanactividad) || cplanactividad <= 0) {
                res.status(400).json({ mensaje: "Código de actividad inválido" });
                return;
            }

            const actividad = await this.useCase.actualizar(cplanactividad, usuario.cusuario, req.body);
            if (!actividad) {
                res.status(404).json({ mensaje: "Actividad del plan no encontrada" });
                return;
            }

            res.json(actividad);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    eliminar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplanactividad = Number(req.params.cplanactividad);

            if (!Number.isInteger(cplanactividad) || cplanactividad <= 0) {
                res.status(400).json({ mensaje: "Código de actividad inválido" });
                return;
            }

            const eliminado = await this.useCase.eliminar(cplanactividad, usuario.cusuario);
            if (!eliminado) {
                res.status(404).json({ mensaje: "Actividad del plan no encontrada" });
                return;
            }

            res.json({ mensaje: "Actividad eliminada del plan correctamente" });
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };
}
