
import { Request, Response } from "express";
import { PlanParticipanteUseCase } from "../application/useCase/planParticipanteUseCase.js";
import {ITokenPayload} from "../../../shared/application/iTokenPayload.js";

export class PlanParticipanteController {
    constructor(private readonly useCase: PlanParticipanteUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const participante = await this.useCase.crear(usuario.cusuario, req.body);
            res.status(201).json(participante);
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

            const participantes = await this.useCase.listarPorPlan(cplan, usuario.cusuario);
            res.json(participantes);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };


    buscar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const participante = await this.useCase.buscar(cplan, usuario.cusuario);
            if (!participante) {
                res.status(404).json({ mensaje: "Participación no encontrada" });
                return;
            }

            res.json(participante);
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

            const participante = await this.useCase.actualizar(cplan, usuario.cusuario, req.body.estado);
            if (!participante) {
                res.status(404).json({ mensaje: "Participación no encontrada" });
                return;
            }

            res.json(participante);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    eliminar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const eliminado = await this.useCase.eliminar(cplan, usuario.cusuario);
            if (!eliminado) {
                res.status(404).json({ mensaje: "Participación no encontrada" });
                return;
            }

            res.json({ mensaje: "Participación eliminada correctamente" });
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };
}
