import { Router } from "express";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import { NegocioPostgresRepository } from "../../negocio/infrastructure/repository/negocioPostgresRepository.js";
import { SucursalUseCase } from "../application/useCase/sucursalUseCase.js";
import { SucursalController } from "./sucursalController.js";
import { SucursalPostgresRepository } from "./Repository/favoritoPostgresRepository.js";

const sucursalRoutes = Router();
const authMiddleware = new AuthMiddleware(new TokenService());
const useCase = new SucursalUseCase(new SucursalPostgresRepository(), new NegocioPostgresRepository());
const controller = new SucursalController(useCase);

sucursalRoutes.use(authMiddleware.autenticar);
sucursalRoutes.post("/negocio/:cnegocio", controller.crear);
sucursalRoutes.get("/negocio/:cnegocio", controller.listarPorNegocio);
sucursalRoutes.put("/negocio/:cnegocio/:csucursal", controller.actualizar);

export { sucursalRoutes };
