
import { Router } from "express";
import { PlanController } from "./planController.js";
import { PlanUseCase } from "../application/useCase/planUseCase.js";
import {PlanPostgresRepository} from "./Repository/planPostgresRepository.js";
import {AuthMiddleware} from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import {TokenService} from "../../../shared/infrastructure/security/tokenService.js";
import {PlanParticipantePostgresRepository} from "../../planParticipante/infraestructure/Repository/planParticipantePostgresRepository.js";


const router = Router();

const repository = new PlanPostgresRepository();
const participanteRepository = new PlanParticipantePostgresRepository();

const useCase = new PlanUseCase(repository, participanteRepository);
const controller = new PlanController(useCase);

const authMiddleware = new AuthMiddleware(new TokenService());

router.post("/", authMiddleware.autenticar, controller.crear);
router.get("/", authMiddleware.autenticar, controller.listarMisPlanes);
router.get("/:cplan", authMiddleware.autenticar, controller.buscarPorId);
router.put("/:cplan", authMiddleware.autenticar, controller.actualizar);

export default router;
