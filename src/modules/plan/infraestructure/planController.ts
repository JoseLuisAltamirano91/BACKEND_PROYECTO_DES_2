
import { Request, Response } from "express";
import { PlanUseCase } from "../application/useCase/planUseCase.js";
import {ITokenPayload} from "../../../shared/application/iTokenPayload.js";

export class PlanController {
    constructor(private readonly planUseCase: PlanUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const plan = await this.planUseCase.crear(usuario.cusuario, req.body);
            res.status(201).json(plan);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    listarMisPlanes = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const planes = await this.planUseCase.listarPorUsuario(usuario.cusuario);
            res.json(planes);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const plan = await this.planUseCase.buscarPorId(cplan, usuario.cusuario);
            if (!plan) {
                res.status(404).json({ mensaje: "Plan no encontrado" });
                return;
            }

            res.json(plan);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const plan = await this.planUseCase.actualizar(cplan, usuario.cusuario, req.body);
            if (!plan) {
                res.status(404).json({ mensaje: "Plan no encontrado" });
                return;
            }

            res.json(plan);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };
}
