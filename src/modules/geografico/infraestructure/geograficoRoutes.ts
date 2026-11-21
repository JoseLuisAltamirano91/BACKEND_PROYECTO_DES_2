import { Router } from "express";
import { GeograficoPostgresRepository } from "./Repository/geograficoPostgresRepository";
import { GeograficoUseCase } from "../application/useCase/geograficoUseCase";
import { GeograficoController } from "./geograficoController";

const router = Router();

const repository = new GeograficoPostgresRepository();
const useCase = new GeograficoUseCase(repository);
const controller = new GeograficoController(useCase);

router.get("/paises", controller.listarPaises.bind(controller));
router.get("/provincias/:cpais", controller.listarProvincias.bind(controller));
router.get("/cantones/:cpais/:cprovincia", controller.listarCantones.bind(controller));
router.get("/parroquias/:cpais/:cprovincia/:ccanton", controller.listarParroquias.bind(controller));

export default router;