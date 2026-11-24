import type { Request, Response } from "express";
import {
    CredencialesInvalidasError,
    LoginUseCase
} from "../application/useCase/loginUseCase.js";
import {
    CorreoYaRegistradoError,
    RegistroUsuarioUseCase
} from "../application/useCase/registroUsuarioUseCase.js";
import {
    DatosPerfilInvalidosError,
    type PerfilUsuarioUseCase
} from "../application/useCase/PerfilUsuarioUseCase.js";


export class UsuarioController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registroUseCase: RegistroUsuarioUseCase,
        private readonly perfilUseCase: PerfilUsuarioUseCase
    ) {}

    login = async (req: Request, res: Response): Promise<void> => {
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

            console.error("Error al iniciar sesión");

            res.status(500).json({
                mensaje: "No se pudo iniciar sesión"
            });
        }
    };

    registrar = async (req: Request, res: Response): Promise<void> => {
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
            const resultado = await this.registroUseCase.ejecutar({
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

    private obtenerCodigoUsuario(res: Response): string | null {
        const sesion = res.locals.usuario;
        const codigo = sesion?.cusuario ?? sesion?.sub;

        if (typeof codigo !== "string" || !codigo.trim()) {
            res.status(401).json({ mensaje: "Sesión inválida" });
            return null;
        }

        return codigo.trim();
    }

    consultarMiPerfil = async (_req: Request, res: Response): Promise<void> => {
        const cusuario = this.obtenerCodigoUsuario(res);
        if (!cusuario) return;

        try {
            const usuario = await this.perfilUseCase.consultar(cusuario);

            if (!usuario) {
                res.status(404).json({ mensaje: "Perfil de usuario no encontrado" });
                return;
            }

            res.status(200).json({ usuario });
        } catch {
            console.error("Error al consultar el perfil");
            res.status(500).json({ mensaje: "No se pudo consultar el perfil" });
        }
    };

    actualizarMiPerfil = async (req: Request, res: Response): Promise<void> => {
        const cusuario = this.obtenerCodigoUsuario(res);
        if (!cusuario) return;

        const { nombres, apellidos, telefono } = req.body ?? {};

        try {
            const usuario = await this.perfilUseCase.actualizar(
                cusuario,
                nombres,
                apellidos,
                telefono
            );

            if (!usuario) {
                res.status(404).json({ mensaje: "Perfil de usuario no encontrado" });
                return;
            }

            res.status(200).json({ usuario });
        } catch (error) {
            if (error instanceof DatosPerfilInvalidosError) {
                res.status(400).json({ mensaje: error.message });
                return;
            }

            console.error("Error al actualizar el perfil");
            res.status(500).json({ mensaje: "No se pudo actualizar el perfil" });
        }
    };
}