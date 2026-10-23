import { Router } from "express";
import { LoginUseCase } from "../../../application/use-cases/loginUseCase.js";
import { UsuarioPostgresRepository } from "../../adapters/postgres/UsuarioPostgresRepository.js";
import { PasswordService } from "../../adapters/security/passwordService.js";
import { TokenService } from "../../adapters/security/tokenService.js";
import { LoginController } from "../controllers/loginController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { autorizarRoles } from "../middlewares/roleMiddleware.js";

const usuarioRepository = new UsuarioPostgresRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const authMiddleware = new AuthMiddleware(tokenService);

const loginUseCase = new LoginUseCase(
    usuarioRepository,
    passwordService,
    tokenService
);

const loginController = new LoginController(loginUseCase);

export const authRoutes = Router();

authRoutes.post("/login", loginController.ejecutar);

authRoutes.get("/me", authMiddleware.autenticar, (_req, res) => {
    res.status(200).json({
        mensaje: "Acceso autorizado",
        usuario: res.locals.usuario
    });
});

authRoutes.get("/admin", authMiddleware.autenticar, autorizarRoles("ADMINISTRADOR"), (_req, res) => {
        res.status(200).json({
            mensaje: "Acceso de administrador autorizado",
            usuario: res.locals.usuario
        });
    }
);