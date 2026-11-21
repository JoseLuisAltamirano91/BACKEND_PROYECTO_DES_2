import { Request, Response } from "express";
import { GeograficoUseCase } from "../application/useCase/geograficoUseCase";

export class GeograficoController {

    constructor(private readonly useCase: GeograficoUseCase) {}

    async listarPaises(req: Request, res: Response): Promise<void> {
        try {
            const datos = await this.useCase.listarPaises();
            res.status(200).json(datos);
        } catch (error) {
            this.manejarError(res, error);
        }
    }

    async listarProvincias(req: Request, res: Response): Promise<void> {
        try {
            const cpais = Number(req.params.cpais);
            const datos = await this.useCase.listarProvincias(cpais);
            res.status(200).json(datos);
        } catch (error) {
            this.manejarError(res, error);
        }
    }

    async listarCantones(req: Request, res: Response): Promise<void> {
        try {
            const cpais = Number(req.params.cpais);
            const cprovincia = Number(req.params.cprovincia);
            const datos = await this.useCase.listarCantones(cpais, cprovincia);
            res.status(200).json(datos);
        } catch (error) {
            this.manejarError(res, error);
        }
    }

    async listarParroquias(req: Request, res: Response): Promise<void> {
        try {
            const cpais = Number(req.params.cpais);
            const cprovincia = Number(req.params.cprovincia);
            const ccanton = Number(req.params.ccanton);
            const datos = await this.useCase.listarParroquias(cpais, cprovincia, ccanton);
            res.status(200).json(datos);
        } catch (error) {
            this.manejarError(res, error);
        }
    }

    private manejarError(res: Response, error: unknown): void {
        if (error instanceof Error && error.message.startsWith("El codigo de")) {
            res.status(400).json({ mensaje: error.message });
            return;
        }
        console.error(error);
        res.status(500).json({ mensaje: "Error al consultar el catalogo geografico" });
    }
}