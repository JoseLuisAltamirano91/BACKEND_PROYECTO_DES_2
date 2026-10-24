import type { Request, Response } from "express";
import { ActualizarNegocioUseCase } from "../../../application/use-cases/actualizarNegocioUseCase.js";
import {ITokenPayload} from "../../../application/dtos/iTokenPayload.js";

export class ActualizarNegocioController {
    constructor(
        private readonly actualizarNegocioUseCase: ActualizarNegocioUseCase
    ) {}

    ejecutar = async (req: Request, res: Response): Promise<void> => {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario) {
            res.status(401).json({
                mensaje: "Se requiere autenticación"
            });
            return;
        }

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

        const cnegocio = Number(codigo);
        const { nombre, descripcion, telefono, correo } = req.body ?? {};

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            nombre.trim().length > 100
        ) {
            res.status(400).json({
                mensaje: "El nombre es obligatorio y admite hasta 100 caracteres"
            });
            return;
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
            return;
        }

        if (
            correo?.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
        ) {
            res.status(400).json({
                mensaje: "El correo no tiene un formato válido"
            });
            return;
        }

        try {
            const negocio = await this.actualizarNegocioUseCase.ejecutar(
                cnegocio,
                usuario.cusuario,
                {
                    nombre,
                    descripcion: descripcion ?? "",
                    telefono: telefono ?? "",
                    correo: correo ?? ""
                }
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
            console.error("Error al actualizar negocio");

            res.status(500).json({
                mensaje: "No se pudo actualizar el negocio"
            });
        }
    };
}