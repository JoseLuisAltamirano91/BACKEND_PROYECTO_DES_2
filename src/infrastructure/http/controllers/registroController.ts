import type { Request, Response } from "express";
import {RegistroUsuarioUseCase, CorreoYaRegistradoError} from "../../../application/use-cases/registroUsuarioUseCase.js";

export class RegistroController {
    constructor(
        private readonly registroUsuarioUseCase: RegistroUsuarioUseCase
    ) {}

    ejecutar = async (req: Request, res: Response): Promise<void> => {
        const { nombres, apellidos, correo, password } = req.body ?? {};

        if (
            typeof nombres !== "string" ||
            typeof apellidos !== "string" ||
            typeof correo !== "string" ||
            typeof password !== "string" ||
            !nombres.trim() ||
            !apellidos.trim() ||
            !correo.trim() ||
            !password.trim()
        ) {
            res.status(400).json({
                mensaje: "Nombres, apellidos, correo y contraseña son obligatorios"
            });
            return;
        }

        if (
            nombres.trim().length > 100 ||
            apellidos.trim().length > 100 ||
            correo.trim().length > 150
        ) {
            res.status(400).json({
                mensaje: "Nombres o apellidos superan 100 caracteres, o el correo supera 150"
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            res.status(400).json({
                mensaje: "El correo no tiene un formato válido"
            });
            return;
        }

        if (
            password.length < 8 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {
            res.status(400).json({
                mensaje: "La contraseña debe tener al menos 8 caracteres y no superar 72 bytes"
            });
            return;
        }

        try {
            const resultado = await this.registroUsuarioUseCase.ejecutar({
                nombres,
                apellidos,
                correo,
                password
            });

            res.status(201).json({
                mensaje: "Usuario registrado correctamente",
                cusuario: resultado.cusuario
            });
        } catch (error) {
            if (error instanceof CorreoYaRegistradoError) {
                res.status(409).json({
                    mensaje: error.message
                });
                return;
            }

            console.error("Error al registrar usuario");

            res.status(500).json({
                mensaje: "No se pudo registrar el usuario"
            });
        }
    };
}