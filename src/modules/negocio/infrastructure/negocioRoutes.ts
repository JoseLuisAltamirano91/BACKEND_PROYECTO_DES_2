import { Router } from "express";
import { ListarMisNegociosUseCase } from "../application/useCase/listarMisNegociosUseCase.js";
import { RegistroNegocioUseCase } from "../application/useCase/registroNegocioUseCase.js";
import { ActualizarNegocioUseCase } from "../application/useCase/actualizarNegocioUseCase.js";
import { NegocioPostgresRepository } from "./repository/negocioPostgresRepository.js";
import { NegocioController } from "./negocioController.js";
import {AuthMiddleware} from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import {TokenService} from "../../../shared/infrastructure/security/tokenService.js";

const negocioRepository = new NegocioPostgresRepository();

const negocioController = new NegocioController(
    new RegistroNegocioUseCase(negocioRepository),
    new ListarMisNegociosUseCase(negocioRepository),
    new ActualizarNegocioUseCase(negocioRepository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const negocioRoutes = Router();

negocioRoutes.use(authMiddleware.autenticar);

negocioRoutes.post("/", negocioController.registrar);
negocioRoutes.get("/mis-negocios", negocioController.listarMios);
negocioRoutes.put("/:cnegocio", negocioController.actualizar);