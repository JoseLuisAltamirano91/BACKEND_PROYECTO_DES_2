import type { Request, Response } from "express";
import { InteresUsuarioUseCase } from "../application/useCase/interesUsuarioUseCase.js";
import type { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class InteresUsuarioController {

    constructor(
        private readonly useCase: InteresUsuarioUseCase
    ) {}

    agregar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const cinteres = req.body?.cinteres;

        if (!Number.isInteger(cinteres) || cinteres <= 0 || cinteres > 99999) {
            res.status(400).json({
                mensaje: "Código de interés inválido"
            });
            return;
        }

        try {
            const interes = await this.useCase.agregar(
                usuario.cusuario,
                cinteres
            );

            res.status(201).json({
                mensaje: "Interés agregado correctamente",
                interes
            });
        } catch (error: unknown) {
            const codigo = (error as { parent?: { code?: string } })?.parent?.code;

            if (codigo === "23505") {
                res.status(409).json({
                    mensaje: "Ya tienes registrado este interés"
                });
                return;
            }

            if (codigo === "23503") {
                res.status(400).json({
                    mensaje: "El interés seleccionado no existe"
                });
                return;
            }

            res.status(500).json({
                mensaje: "No se pudo agregar el interés"
            });
        }
    };

    listarPorUsuario = async (_req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        try {
            const intereses = await this.useCase.listarPorUsuario(
                usuario.cusuario
            );

            res.status(200).json({ intereses });
        } catch {
            res.status(500).json({
                mensaje: "No se pudieron consultar los intereses"
            });
        }
    };

    eliminar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const codigo = req.params.cinteres;

        if (
            typeof codigo !== "string" ||
            !/^[1-9]\d*$/.test(codigo) ||
            Number(codigo) > 99999
        ) {
            res.status(400).json({
                mensaje: "Código de interés inválido"
            });
            return;
        }

        try {
            await this.useCase.eliminar(
                usuario.cusuario,
                Number(codigo)
            );

            res.status(200).json({
                mensaje: "Interés eliminado correctamente"
            });
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "";

            res.status(
                mensaje === "El usuario no tiene registrado ese interés" ? 404 : 500
            ).json({
                mensaje: mensaje === "El usuario no tiene registrado ese interés"
                    ? mensaje
                    : "No se pudo eliminar el interés"
            });
        }
    };

    private obtenerUsuario(res: Response): ITokenPayload | undefined {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario) {
            res.status(401).json({
                mensaje: "Se requiere autenticación"
            });
        }

        return usuario;
    }
}