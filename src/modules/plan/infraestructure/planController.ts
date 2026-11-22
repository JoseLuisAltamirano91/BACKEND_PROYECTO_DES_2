
import { Request, Response } from "express";
import { PlanUseCase } from "../application/useCase/planUseCase.js";
import { ITokenPayload } from "../../../shared/application/iTokenPayload.js";
import { IFiltroPlanes } from "../domain/repository/iPlanRepository.js";

export class PlanController {
    constructor(private readonly planUseCase: PlanUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const plan = await this.planUseCase.crear(usuario.cusuario, req.body);
            res.status(201).json(plan);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    listarMisPlanes = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const planes = await this.planUseCase.listarPorUsuario(usuario.cusuario);
            res.json(planes);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const plan = await this.planUseCase.buscarPorId(cplan, usuario.cusuario);
            if (!plan) {
                res.status(404).json({ mensaje: "Plan no encontrado" });
                return;
            }

            res.json(plan);
        } catch (error: any) {
            res.status(500).json({ mensaje: error.message });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const cplan = Number(req.params.cplan);

            if (!Number.isInteger(cplan) || cplan <= 0) {
                res.status(400).json({ mensaje: "Código de plan inválido" });
                return;
            }

            const plan = await this.planUseCase.actualizar(cplan, usuario.cusuario, req.body);
            if (!plan) {
                res.status(404).json({ mensaje: "Plan no encontrado" });
                return;
            }

            res.json(plan);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    };

    listarPublicos = async (_req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;
            const planes = await this.planUseCase.listarPublicos(usuario.cusuario);

            res.status(200).json(planes);
        } catch (error) {
            res.status(500).json({
                mensaje: "No se pudieron consultar los planes públicos"
            });
        }
    };

    buscarPublicosFiltrados = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = res.locals.usuario as ITokenPayload;

            const obtenerNumero = (campo: string): number | undefined => {
                const valor = req.query[campo];
                if (valor === undefined) return undefined;
                if (typeof valor !== "string" || !valor.trim() || !Number.isFinite(Number(valor)))
                    throw new Error(`El parametro ${campo} no es valido`);
                return Number(valor);
            };

            const interesesParametro = req.query.intereses;
            let intereses: number[] | undefined;

            if (interesesParametro !== undefined) {
                if (typeof interesesParametro !== "string")
                    throw new Error("Los intereses seleccionados no son validos");

                intereses = interesesParametro.trim() === ""
                    ? []
                    : interesesParametro.split(",").map(valor => {
                        if (!valor.trim()) throw new Error("Los intereses seleccionados no son validos");
                        return Number(valor);
                    });
            }

            const filtros: IFiltroPlanes = {
                cusuario: usuario.cusuario,
                intereses,
                presupuesto: obtenerNumero("presupuesto"),
                distancia: obtenerNumero("distancia"),
                latitud: obtenerNumero("latitud"),
                longitud: obtenerNumero("longitud"),
                pagina: obtenerNumero("pagina") ?? 1,
                limite: obtenerNumero("limite") ?? 12
            };

            const resultado = await this.planUseCase.buscarPublicosFiltrados(filtros);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(400).json({
                mensaje: error.message || "No se pudieron consultar los planes"
            });
        }
    };
}
