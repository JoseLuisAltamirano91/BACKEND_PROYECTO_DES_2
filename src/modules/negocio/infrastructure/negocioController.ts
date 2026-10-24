import type { Request, Response } from "express";
import type { ITokenPayload } from "../../../application/dtos/iTokenPayload.js";
import type { IRegistroNegocio } from "../application/dtos/iRegistroNegocio.js";
import { RegistroNegocioUseCase } from "../application/registroNegocioUseCase.js";
import { ListarMisNegociosUseCase } from "../application/listarMisNegociosUseCase.js";
import { ActualizarNegocioUseCase } from "../application/actualizarNegocioUseCase.js";

export class NegocioController {
    constructor(
        private readonly registroUseCase: RegistroNegocioUseCase,
        private readonly listarUseCase: ListarMisNegociosUseCase,
        private readonly actualizarUseCase: ActualizarNegocioUseCase
    ) {}

    registrar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const negocio = await this.registroUseCase.ejecutar(
                usuario.cusuario,
                datos
            );

            res.status(201).json({
                mensaje: "Negocio registrado correctamente",
                negocio
            });
        } catch {
            res.status(500).json({
                mensaje: "No se pudo registrar el negocio"
            });
        }
    };

    listarMios = async (_req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        try {
            const negocios = await this.listarUseCase.ejecutar(
                usuario.cusuario
            );

            res.status(200).json({ negocios });
        } catch {
            res.status(500).json({
                mensaje: "No se pudieron consultar los negocios"
            });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const codigo = req.params.cnegocio;

        if (
            typeof codigo !== "string" ||
            !/^[1-9]\d*$/.test(codigo) ||
            Number(codigo) > 2147483647
        ) {
            res.status(400).json({
                mensaje: "El código del negocio debe ser un entero positivo válido"
            });
            return;
        }

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const negocio = await this.actualizarUseCase.ejecutar(
                Number(codigo),
                usuario.cusuario,
                datos
            );

            if (!negocio) {
                res.status(404).json({
                    mensaje: "Negocio no encontrado"
                });
                return;
            }

            res.status(200).json({
                mensaje: "Negocio actualizado correctamente",
                negocio
            });
        } catch {
            res.status(500).json({
                mensaje: "No se pudo actualizar el negocio"
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

    private validarDatos(
        req: Request,
        res: Response
    ): IRegistroNegocio | null {
        const { nombre, descripcion, telefono, correo } = req.body ?? {};

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            nombre.trim().length > 100
        ) {
            res.status(400).json({
                mensaje: "El nombre es obligatorio y admite hasta 100 caracteres"
            });
            return null;
        }

        if (
            (descripcion !== undefined &&
                (typeof descripcion !== "string" ||
                    descripcion.trim().length > 150)) ||
            (telefono !== undefined &&
                (typeof telefono !== "string" ||
                    telefono.trim().length > 25)) ||
            (correo !== undefined &&
                (typeof correo !== "string" ||
                    correo.trim().length > 100))
        ) {
            res.status(400).json({
                mensaje: "Descripción, teléfono y correo deben ser textos de hasta 150, 25 y 100 caracteres, respectivamente"
            });
            return null;
        }

        if (
            correo?.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
        ) {
            res.status(400).json({
                mensaje: "El correo no tiene un formato válido"
            });
            return null;
        }

        return {
            nombre,
            descripcion: descripcion ?? "",
            telefono: telefono ?? "",
            correo: correo ?? ""
        };
    }
}