import { Router } from "express";
import { PreferenciaUsuarioUseCase } from "../application/useCase/preferenciaUsuarioUseCase.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import {PreferenciaUsuarioPostgresRepository} from "./Repository/preferenciaUsarioPostgresRepository";
import {PreferenciaUsuarioController} from "./PreferenciaUsuarioController.js";

const repository = new PreferenciaUsuarioPostgresRepository();

const controller = new PreferenciaUsuarioController(
    new PreferenciaUsuarioUseCase(repository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const preferenciaUsuarioRoutes = Router();

preferenciaUsuarioRoutes.use(authMiddleware.autenticar);

preferenciaUsuarioRoutes.post("/", controller.crear);
preferenciaUsuarioRoutes.get("/mis-preferencias", controller.obtenerPorUsuario);
preferenciaUsuarioRoutes.put("/", controller.actualizar);