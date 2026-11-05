import { Router } from "express";
import { InteresUsuarioUseCase } from "../application/useCase/interesUsuarioUseCase.js";
import { InteresUsuarioController } from "./interesUsuarioController.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import {InteresUsuarioPostgresRepository} from "./Repository/interesUsarioPostgresRepository.js";

const repository = new InteresUsuarioPostgresRepository();

const controller = new InteresUsuarioController(
    new InteresUsuarioUseCase(repository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const interesUsuarioRoutes = Router();

// Todas las rutas requieren JWT
interesUsuarioRoutes.use(authMiddleware.autenticar);

interesUsuarioRoutes.post("/", controller.agregar);
interesUsuarioRoutes.get("/mis-intereses", controller.listarPorUsuario);
interesUsuarioRoutes.delete("/:cinteres", controller.eliminar);