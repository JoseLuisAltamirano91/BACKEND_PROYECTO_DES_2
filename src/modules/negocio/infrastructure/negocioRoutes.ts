import { Router } from "express";
import { ListarMisNegociosUseCase } from "../application/listarMisNegociosUseCase.js";
import { RegistroNegocioUseCase } from "../application/registroNegocioUseCase.js";
import { ActualizarNegocioUseCase } from "../application/actualizarNegocioUseCase.js";
import { NegocioPostgresRepository } from "./negocioPostgresRepository.js";
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