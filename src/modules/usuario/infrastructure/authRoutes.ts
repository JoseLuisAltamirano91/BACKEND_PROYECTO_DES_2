import { Router } from "express";
import { LoginUseCase } from "../application/useCase/loginUseCase";
import { RegistroUsuarioUseCase } from "../application/useCase/registroUsuarioUseCase";
import { UsuarioPostgresRepository } from "./repository/usuarioPostgresRepository";
import { UsuarioController } from "./usuarioController.js";
import {PasswordService} from "../../../shared/infrastructure/security/passwordService.js";
import {TokenService} from "../../../shared/infrastructure/security/tokenService.js";
import {AuthMiddleware} from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import {autorizarRoles} from "../../../shared/infrastructure/middlewares/roleMiddleware.js";

const usuarioRepository = new UsuarioPostgresRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();

const usuarioController = new UsuarioController(
    new LoginUseCase(usuarioRepository, passwordService, tokenService),
    new RegistroUsuarioUseCase(usuarioRepository, passwordService)
);

const authMiddleware = new AuthMiddleware(tokenService);

export const authRoutes = Router();

authRoutes.post("/login", usuarioController.login);
authRoutes.post("/registro", usuarioController.registrar);

authRoutes.get("/me", authMiddleware.autenticar, (_req, res) => {
    res.status(200).json({
        mensaje: "Acceso autorizado",
        usuario: res.locals.usuario
    });
});

authRoutes.get(
    "/admin",
    authMiddleware.autenticar,
    autorizarRoles("ADMINISTRADOR"),
    (_req, res) => {
        res.status(200).json({
            mensaje: "Acceso de administrador autorizado",
            usuario: res.locals.usuario
        });
    }
);