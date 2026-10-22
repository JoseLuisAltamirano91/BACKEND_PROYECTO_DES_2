import type { Request, Response } from "express";
import {
    LoginUseCase,
    CredencialesInvalidasError
} from "../../../application/use-cases/loginUseCase.js";

export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    ejecutar = async (req: Request, res: Response): Promise<void> => {
        const { correo, password } = req.body ?? {};

        if (
            typeof correo !== "string" ||
            typeof password !== "string" ||
            !correo.trim() ||
            !password
        ) {
            res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
            return;
        }

        try {
            const resultado = await this.loginUseCase.ejecutar(
                correo,
                password
            );

            res.status(200).json(resultado);
        } catch (error) {
            if (error instanceof CredencialesInvalidasError) {
                res.status(401).json({
                    mensaje: error.message
                });
                return;
            }

            console.error("Error al iniciar sesión:", error);

            res.status(500).json({
                mensaje: "No se pudo iniciar sesión"
            });
        }
    };
}