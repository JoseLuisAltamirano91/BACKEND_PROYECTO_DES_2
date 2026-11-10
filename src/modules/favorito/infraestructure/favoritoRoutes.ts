
import { Router } from "express";
import { FavoritoController } from "./favoritoController.js";
import { FavoritoUseCase } from "../application/useCase/favoritoUseCase.js";
import { FavoritoPostgresRepository } from "./Repository/favoritoPostgresRepository.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";

const router = Router();

const repository = new FavoritoPostgresRepository();
const useCase = new FavoritoUseCase(repository);
const controller = new FavoritoController(useCase);

const authMiddleware = new AuthMiddleware(new TokenService());

router.post("/", authMiddleware.autenticar, controller.crear);
router.get("/", authMiddleware.autenticar, controller.listarMisFavoritos);
router.get("/:cfavorito", authMiddleware.autenticar, controller.buscarPorId);
router.delete("/:cfavorito", authMiddleware.autenticar, controller.eliminar);

export default router;
