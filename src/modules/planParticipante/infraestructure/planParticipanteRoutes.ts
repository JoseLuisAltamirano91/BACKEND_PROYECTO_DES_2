
import { Router } from "express";
import { PlanParticipanteController } from "./planParticipanteController.js";
import { PlanParticipanteUseCase } from "../application/useCase/planParticipanteUseCase.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import {PlanParticipantePostgresRepository} from "./Repository/planParticipantePostgresRepository.js";

const router = Router();

const repository = new PlanParticipantePostgresRepository();
const useCase = new PlanParticipanteUseCase(repository);
const controller = new PlanParticipanteController(useCase);

const authMiddleware = new AuthMiddleware(new TokenService());

router.post("/", authMiddleware.autenticar, controller.crear);
router.get("/plan/:cplan", authMiddleware.autenticar, controller.listarPorPlan);
router.get("/:cplan", authMiddleware.autenticar, controller.buscar);
router.put("/:cplan", authMiddleware.autenticar, controller.actualizar);
router.delete("/:cplan", authMiddleware.autenticar, controller.eliminar);

export default router;
