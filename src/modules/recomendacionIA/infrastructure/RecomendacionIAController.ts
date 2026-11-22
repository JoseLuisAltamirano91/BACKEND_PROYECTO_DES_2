
import type { Request, Response } from "express";
import { RecomendacionIAUseCase } from "../application/useCase/RecomendacionIAUseCase.js";

export class RecomendacionIAController {
    constructor(private readonly useCase: RecomendacionIAUseCase) {}

    async recomendar(req: Request, res: Response): Promise<void> {
        try {
            const usuario = res.locals.usuario as {
                sub?: string;
                cusuario?: string;
            } | undefined;

            const cusuario = usuario?.cusuario ?? usuario?.sub;

            if (!cusuario) {
                res.status(401).json({ mensaje: "Usuario no autenticado" });
                return;
            }

            const { consulta, intereses, presupuesto, distancia, latitud, longitud } = req.body ?? {};

            if (typeof consulta !== "string" || !consulta.trim() || consulta.length > 500) {
                res.status(400).json({
                    mensaje: "La consulta debe contener entre 1 y 500 caracteres"
                });
                return;
            }

            if (intereses !== undefined && (
                !Array.isArray(intereses) ||
                intereses.some((id: unknown) => !Number.isSafeInteger(id) || Number(id) <= 0)
            )) {
                res.status(400).json({ mensaje: "Los intereses no son válidos" });
                return;
            }

            for (const [campo, valor] of Object.entries({ presupuesto, distancia })) {
                if (valor !== undefined && (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0)) {
                    res.status(400).json({ mensaje: `El campo ${campo} no es válido` });
                    return;
                }
            }

            if ((latitud === undefined) !== (longitud === undefined)) {
                res.status(400).json({ mensaje: "Debes enviar latitud y longitud juntas" });
                return;
            }

            if (latitud !== undefined && (
                typeof latitud !== "number" || !Number.isFinite(latitud) || latitud < -90 || latitud > 90 ||
                typeof longitud !== "number" || !Number.isFinite(longitud) || longitud < -180 || longitud > 180
            )) {
                res.status(400).json({ mensaje: "Las coordenadas no son válidas" });
                return;
            }

            if (distancia !== undefined && latitud === undefined) {
                res.status(400).json({ mensaje: "Debes indicar una ubicación para filtrar por distancia" });
                return;
            }

            const recomendaciones = await this.useCase.recomendar({
                consulta,
                cusuario,
                intereses,
                presupuesto,
                distancia,
                latitud,
                longitud
            });

            res.status(200).json({ recomendaciones });
        } catch (error) {
            console.error("Error en recomendaciones IA:", error);

            res.status(500).json({
                mensaje: "No se pudieron generar las recomendaciones en este momento"
            });
        }
    }
}
