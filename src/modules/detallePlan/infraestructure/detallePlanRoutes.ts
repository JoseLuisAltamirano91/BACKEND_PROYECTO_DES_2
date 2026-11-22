
import { Router } from "express";
import { DetallePlanController } from "./detallePlanController.js";
import { DetallePlanUseCase } from "../application/useCase/detallePlanUseCase.js";
import { DetallePlanMongoRepository } from "./Repository/detallePlanMongoRepository.js";
import { PlanPostgresRepository } from "../../plan/infraestructure/repository/planPostgresRepository.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";

const router = Router();

const detalleRepository = new DetallePlanMongoRepository();
const planRepository = new PlanPostgresRepository();

const useCase = new DetallePlanUseCase(detalleRepository, planRepository);
const controller = new DetallePlanController(useCase);

const authMiddleware = new AuthMiddleware(new TokenService());

router.use(authMiddleware.autenticar);

router.post("/:cplan", controller.crear);
router.get("/:cplan", controller.buscarPorPlan);
router.put("/:cplan", controller.actualizar);

export default router;
