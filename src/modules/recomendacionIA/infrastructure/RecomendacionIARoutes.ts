
import { Router } from "express";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { PlanPostgresRepository } from "../../plan/infraestructure/repository/planPostgresRepository.js";
import { RecomendacionIAUseCase } from "../application/useCase/RecomendacionIAUseCase.js";
import { RecomendacionIAController } from "./RecomendacionIAController.js";
import { GeminiService } from "./service/GeminiService.js";
import {TokenService} from "../../../shared/infrastructure/security/tokenService.js";

const router = Router();

const planRepository = new PlanPostgresRepository();
const geminiService = new GeminiService();
const useCase = new RecomendacionIAUseCase(planRepository, geminiService);
const controller = new RecomendacionIAController(useCase);
const authMiddleware = new AuthMiddleware(new TokenService());

router.post(
    "/",
    authMiddleware.autenticar,
    (req, res) => controller.recomendar(req, res)
);

export default router;
