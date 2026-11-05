import { Router } from "express";
import { InteresUseCase } from "../application/useCase/interesUseCase.js";
import { InteresController } from "./interesController.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import { autorizarRoles } from "../../../shared/infrastructure/middlewares/roleMiddleware.js";
import {InteresPostgresRepository} from "./Repository/interesPostgresRepository.js";

const repository = new InteresPostgresRepository();

const controller = new InteresController(
    new InteresUseCase(repository)
);

const authMiddleware = new AuthMiddleware(new TokenService());

export const interesRoutes = Router();

interesRoutes.get("/", controller.listar);

interesRoutes.post(
    "/",
    authMiddleware.autenticar,
    autorizarRoles("ADMINISTRADOR"),
    controller.crear
);

interesRoutes.put(
    "/:cinteres",
    authMiddleware.autenticar,
    autorizarRoles("ADMINISTRADOR"),
    controller.actualizar
);