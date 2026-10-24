import { Router } from "express";
import { LoginUseCase } from "../application/loginUseCase.js";
import { RegistroUsuarioUseCase } from "../application/registroUsuarioUseCase.js";
import { UsuarioPostgresRepository } from "./usuarioPostgresRepository.js";
import { UsuarioController } from "./usuarioController.js";
import { PasswordService } from "../../../infrastructure/adapters/security/passwordService.js";
import { TokenService } from "../../../infrastructure/adapters/security/tokenService.js";
import { AuthMiddleware } from "../../../infrastructure/http/middlewares/authMiddleware.js";
import { autorizarRoles } from "../../../infrastructure/http/middlewares/roleMiddleware.js";

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