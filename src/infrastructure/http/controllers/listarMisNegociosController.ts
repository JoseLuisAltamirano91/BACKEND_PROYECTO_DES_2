import type { Request, Response } from "express";
import { ListarMisNegociosUseCase } from "../../../application/use-cases/listarMisNegociosUseCase.js";
import {ITokenPayload} from "../../../application/dtos/iTokenPayload";

export class ListarMisNegociosController {
    constructor(
        private readonly listarMisNegociosUseCase: ListarMisNegociosUseCase
    ) {}

    ejecutar = async (_req: Request, res: Response): Promise<void> => {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario) {
            res.status(401).json({
                mensaje: "Se requiere autenticación"
            });
            return;
        }

        try {
            const negocios = await this.listarMisNegociosUseCase.ejecutar(
                usuario.cusuario
            );

            res.status(200).json({ negocios });
        } catch {
            console.error("Error al consultar los negocios");

            res.status(500).json({
                mensaje: "No se pudieron consultar los negocios"
            });
        }
    };
}