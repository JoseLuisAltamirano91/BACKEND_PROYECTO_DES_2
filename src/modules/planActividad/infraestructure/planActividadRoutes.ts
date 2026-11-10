
import { Router } from "express";
import { PlanActividadController } from "./planActividadController.js";
import { PlanActividadUseCase } from "../application/useCase/planActividadUseCase.js";
import { PlanActividadPostgresRepository } from "./Repository/planActividadPostgresRepository.js";
import { PlanPostgresRepository } from "../../plan/infraestructure/Repository/planPostgresRepository.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";

const router = Router();

const repository = new PlanActividadPostgresRepository();
const planRepository = new PlanPostgresRepository();

const useCase = new PlanActividadUseCase(repository, planRepository);
const controller = new PlanActividadController(useCase);

const authMiddleware = new AuthMiddleware(new TokenService());

router.post("/", authMiddleware.autenticar, controller.crear);
router.get("/plan/:cplan", authMiddleware.autenticar, controller.listarPorPlan);
router.get("/:cplanactividad", authMiddleware.autenticar, controller.buscarPorId);
router.put("/:cplanactividad", authMiddleware.autenticar, controller.actualizar);
router.delete("/:cplanactividad", authMiddleware.autenticar, controller.eliminar);

export default router;
