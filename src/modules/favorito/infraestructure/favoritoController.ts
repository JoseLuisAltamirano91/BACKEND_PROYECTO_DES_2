
import { Request, Response } from "express";
import { FavoritoUseCase } from "../application/useCase/favoritoUseCase.js";
import { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class FavoritoController {
    constructor(private readonly useCase: FavoritoUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const favorito = await this.useCase.crear(usuario.cusuario, req.body);
            res.status(201).json(favorito);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    listarMisFavoritos = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const favoritos = await this.useCase.listarPorUsuario(usuario.cusuario);
            res.json(favoritos);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cfavorito = Number(req.params.cfavorito);

            if (!Number.isInteger(cfavorito) || cfavorito <= 0) {
                res.status(400).json({ mensaje: "Código de favorito inválido" });
                return;
            }

            const favorito = await this.useCase.buscarPorId(cfavorito, usuario.cusuario);
            if (!favorito) {
                res.status(404).json({ mensaje: "Favorito no encontrado" });
                return;
            }

            res.json(favorito);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    eliminar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cfavorito = Number(req.params.cfavorito);

            if (!Number.isInteger(cfavorito) || cfavorito <= 0) {
                res.status(400).json({ mensaje: "Código de favorito inválido" });
                return;
            }

            const eliminado = await this.useCase.eliminar(cfavorito, usuario.cusuario);
            if (!eliminado) {
                res.status(404).json({ mensaje: "Favorito no encontrado" });
                return;
            }

            res.json({ mensaje: "Favorito eliminado correctamente" });
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };
}
