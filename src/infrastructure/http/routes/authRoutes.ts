import { Router } from "express";
import { LoginUseCase } from "../../../application/use-cases/loginUseCase.js";
import { UsuarioPostgresRepository } from "../../adapters/postgres/UsuarioPostgresRepository.js";
import { PasswordService } from "../../adapters/security/passwordService.js";
import { TokenService } from "../../adapters/security/tokenService.js";
import { LoginController } from "../controllers/loginController.js";

const usuarioRepository = new UsuarioPostgresRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();

const loginUseCase = new LoginUseCase(
    usuarioRepository,
    passwordService,
    tokenService
);

const loginController = new LoginController(loginUseCase);

export const authRoutes = Router();

authRoutes.post("/login", loginController.ejecutar);