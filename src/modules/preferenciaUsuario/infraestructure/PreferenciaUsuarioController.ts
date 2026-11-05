import type { Request, Response } from "express";
import { PreferenciaUsuarioUseCase } from "../application/useCase/preferenciaUsuarioUseCase.js";
import type { IPreferenciaUsuarioDto } from "../domain/dto/iPreferenciaUsuarioDto.js";
import type { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class PreferenciaUsuarioController {

    constructor(
        private readonly useCase: PreferenciaUsuarioUseCase
    ) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const preferencia = await this.useCase.crear(usuario.cusuario, datos);

            res.status(201).json({
                mensaje: "Preferencias registradas correctamente",
                preferencia
            });
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "";

            res.status(mensaje === "El usuario ya tiene preferencias registradas" ? 409 : 500).json({
                mensaje: mensaje === "El usuario ya tiene preferencias registradas"
                    ? mensaje
                    : "No se pudieron registrar las preferencias"
            });
        }
    };

    obtenerPorUsuario = async (_req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        try {
            const preferencia = await this.useCase.obtenerPorUsuario(usuario.cusuario);

            if (!preferencia) {
                res.status(404).json({
                    mensaje: "Preferencias no encontradas"
                });
                return;
            }

            res.status(200).json({ preferencia });
        } catch {
            res.status(500).json({
                mensaje: "No se pudieron consultar las preferencias"
            });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const preferencia = await this.useCase.actualizar(
                usuario.cusuario,
                datos
            );

            res.status(200).json({
                mensaje: "Preferencias actualizadas correctamente",
                preferencia
            });
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "";

            res.status(mensaje === "Preferencias no encontradas" ? 404 : 500).json({
                mensaje: mensaje === "Preferencias no encontradas"
                    ? mensaje
                    : "No se pudieron actualizar las preferencias"
            });
        }
    };

    private obtenerUsuario(res: Response): ITokenPayload | undefined {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario) {
            res.status(401).json({
                mensaje: "Se requiere autenticación"
            });
        }

        return usuario;
    }

    private validarDatos(req: Request, res: Response): IPreferenciaUsuarioDto | null {
        const datos: Record<string, unknown> = req.body ?? {};

        const { presupuestomax, distanciamax, tipocompania, activo } = datos;

        if (
            presupuestomax !== undefined &&
            presupuestomax !== null &&
            (typeof presupuestomax !== "number" ||
                !Number.isFinite(presupuestomax) ||
                presupuestomax < 0 ||
                presupuestomax > 99999999.99 ||
                Math.round(presupuestomax * 100) !== presupuestomax * 100)
        ) {
            res.status(400).json({
                mensaje: "El presupuesto debe ser un número positivo con máximo dos decimales"
            });
            return null;
        }

        if (
            distanciamax !== undefined &&
            distanciamax !== null &&
            (!Number.isInteger(distanciamax) ||
                (distanciamax as number) < 0 ||
                (distanciamax as number) > 99999)
        ) {
            res.status(400).json({
                mensaje: "La distancia debe ser un entero entre 0 y 99999"
            });
            return null;
        }

        if (
            tipocompania !== undefined &&
            tipocompania !== null &&
            (typeof tipocompania !== "string" ||
                !["SOLO", "PAREJA", "AMIGOS", "FAMILIA"].includes(tipocompania))
        ) {
            res.status(400).json({
                mensaje: "Tipo de compañía inválido"
            });
            return null;
        }

        if (
            activo !== undefined &&
            activo !== null &&
            typeof activo !== "boolean"
        ) {
            res.status(400).json({
                mensaje: "Activo debe ser verdadero o falso"
            });
            return null;
        }

        return {
            presupuestomax: presupuestomax as number | null | undefined,
            distanciamax: distanciamax as number | null | undefined,
            tipocompania: tipocompania as string | null | undefined,
            activo: activo as boolean | null | undefined
        };
    }
}