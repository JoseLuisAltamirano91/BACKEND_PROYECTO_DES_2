
import { Router } from "express";
import { ProductoController } from "./productoController.js";
import { ProductoUseCase } from "../application/useCase/productoUseCase.js";
import { ProductoMongoRepository } from "./Repository/productoMongoRepository.js";
import { SucursalPostgresRepository } from "../../sucursal/infraestructure/Repository/sucursalPostgresRepository.js";
import { NegocioPostgresRepository } from "../../negocio/infrastructure/repository/negocioPostgresRepository.js";
import { AuthMiddleware } from "../../../shared/infrastructure/middlewares/authMiddleware.js";
import { TokenService } from "../../../shared/infrastructure/security/tokenService.js";
import { autorizarRoles } from "../../../shared/infrastructure/middlewares/roleMiddleware.js";

const router = Router();

const productoRepository = new ProductoMongoRepository();
const sucursalRepository = new SucursalPostgresRepository();
const negocioRepository = new NegocioPostgresRepository();

const useCase = new ProductoUseCase(
    productoRepository,
    sucursalRepository,
    negocioRepository
);

const controller = new ProductoController(useCase);
const authMiddleware = new AuthMiddleware(new TokenService());

router.get("/sucursal/:csucursal", controller.listarPorSucursal);
router.get("/:id", controller.buscarPorId);

router.post("/", authMiddleware.autenticar, autorizarRoles("NEGOCIO"), controller.crear);
router.put("/:id", authMiddleware.autenticar, autorizarRoles("NEGOCIO"), controller.actualizar);
router.delete("/:id", authMiddleware.autenticar, autorizarRoles("NEGOCIO"), controller.eliminar);

export default router;
