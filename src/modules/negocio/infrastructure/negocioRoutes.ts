import { Router } from "express";
import { NegocioPostgresRepository } from "./repository/negocioPostgresRepository.js";
import { NegocioController } from "./negocioController.js";
import {AuthMiddleware} from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import {TokenService} from "../../../shared/infrastructure/security/tokenService.js";
import {NegocioUseCase} from "../application/useCase/negocioUseCase.js";

const negocioRepository = new NegocioPostgresRepository();

const negocioController = new NegocioController(
    new NegocioUseCase(negocioRepository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const negocioRoutes = Router();

// Ruta pública: consultar información de un negocio
negocioRoutes.get("/publico/:cnegocio", negocioController.buscarPublico);

// Rutas protegidas: administración de negocios
negocioRoutes.use(authMiddleware.autenticar);

negocioRoutes.post("/", negocioController.registrar);
negocioRoutes.get("/mis-negocios", negocioController.listarMios);
negocioRoutes.put("/:cnegocio", negocioController.actualizar);