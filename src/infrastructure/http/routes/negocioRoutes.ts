import { Router } from "express";
import { RegistroNegocioUseCase } from "../../../application/use-cases/registroNegocioUseCase.js";
import { NegocioPostgresRepository } from "../../adapters/postgres/negocioPostgresRepository.js";
import { TokenService } from "../../adapters/security/tokenService.js";
import { RegistroNegocioController } from "../controllers/registroNegocioController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { ListarMisNegociosUseCase } from "../../../application/use-cases/listarMisNegociosUseCase.js";
import { ListarMisNegociosController } from "../controllers/listarMisNegociosController.js";

const negocioRepository = new NegocioPostgresRepository();
const listarMisNegociosUseCase = new ListarMisNegociosUseCase(negocioRepository);
const listarMisNegociosController = new ListarMisNegociosController(listarMisNegociosUseCase);
const tokenService = new TokenService();
const registroNegocioUseCase = new RegistroNegocioUseCase(negocioRepository);
const registroNegocioController = new RegistroNegocioController(registroNegocioUseCase);

const authMiddleware = new AuthMiddleware(tokenService);

export const negocioRoutes = Router();

negocioRoutes.post(
    "/",
    authMiddleware.autenticar,
    registroNegocioController.ejecutar
);

negocioRoutes.get(
    "/mis-negocios",
    authMiddleware.autenticar,
    listarMisNegociosController.ejecutar
);
