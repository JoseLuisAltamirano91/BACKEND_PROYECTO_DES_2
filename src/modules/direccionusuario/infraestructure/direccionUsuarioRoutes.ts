import { Router } from "express";
import { DireccionUsuarioUseCase } from "../application/useCase/DireccionUsuarioUseCase.js";
import { DireccionUsarioPostgresRepository } from "./Repository/direccionUsarioPostgresRepository";
import { DireccionUsuarioController } from "./DireccionUsuarioController.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware";
import { TokenService } from "../../../shared/infrastructure/security/tokenService";

const direccionUsuarioRepository = new DireccionUsarioPostgresRepository();

const direccionUsuarioController = new DireccionUsuarioController(
    new DireccionUsuarioUseCase(direccionUsuarioRepository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const direccionUsuarioRoutes = Router();

direccionUsuarioRoutes.use(authMiddleware.autenticar);

direccionUsuarioRoutes.post("/", direccionUsuarioController.crear);
direccionUsuarioRoutes.get("/mis-direcciones", direccionUsuarioController.listarPorUsuario);
direccionUsuarioRoutes.put("/:cdireccion", direccionUsuarioController.actualizar);