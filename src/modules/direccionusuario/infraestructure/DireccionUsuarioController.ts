import type { Request, Response } from "express";
import type { IDireccionUsuarioDto } from "../domain/dto/iDireccionUsuarioDto.js";
import type { ITokenPayload } from "../../../shared/application/iTokenPayload.js";
import {DireccionUsuarioUseCase} from "../application/useCase/direccionUsuarioUseCase";

export class DireccionUsuarioController {
    constructor(private readonly useCase: DireccionUsuarioUseCase) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const direccion = await this.useCase.crear(usuario.cusuario, datos);

            res.status(201).json({
                mensaje: "Dirección registrada correctamente",
                direccion
            });
        } catch {
            res.status(500).json({
                mensaje: "No se pudo registrar la dirección"
            });
        }
    };

    listarPorUsuario = async (_req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        try {
            const direcciones = await this.useCase.listarPorUsuario(usuario.cusuario);

            res.status(200).json({ direcciones });
        } catch {
            res.status(500).json({
                mensaje: "No se pudieron consultar las direcciones"
            });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const codigo = req.params.cdireccion;

        if (
            typeof codigo !== "string" ||
            !/^[1-9]\d*$/.test(codigo) ||
            Number(codigo) > 99999
        ) {
            res.status(400).json({
                mensaje: "El código de dirección debe ser un entero positivo válido"
            });
            return;
        }

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const direccion = await this.useCase.actualizar(
                Number(codigo),
                usuario.cusuario,
                datos
            );

            res.status(200).json({
                mensaje: "Dirección actualizada correctamente",
                direccion
            });
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "";

            res.status(mensaje === "Dirección no encontrada" ? 404 : 500).json({
                mensaje: mensaje === "Dirección no encontrada"
                    ? mensaje
                    : "No se pudo actualizar la dirección"
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

    private validarDatos(req: Request, res: Response): IDireccionUsuarioDto | null {
        const datos = req.body ?? {};

        const campos = [
            "pais", "provincia", "canton",
            "ciudad", "parroquia", "sector"
        ];

        for (const campo of campos) {
            const valor = datos[campo];

            if (
                valor !== undefined &&
                valor !== null &&
                (!Number.isInteger(valor) || valor < 0 || valor > 99999)
            ) {
                res.status(400).json({
                    mensaje: `${campo} debe ser un número entero válido`
                });
                return null;
            }
        }

        if (
            datos.direccion !== undefined &&
            datos.direccion !== null &&
            (typeof datos.direccion !== "string" || datos.direccion.length > 500)
        ) {
            res.status(400).json({
                mensaje: "La dirección debe ser un texto de hasta 500 caracteres"
            });
            return null;
        }

        if (
            datos.principal !== undefined &&
            datos.principal !== null &&
            typeof datos.principal !== "boolean"
        ) {
            res.status(400).json({
                mensaje: "Principal debe ser verdadero o falso"
            });
            return null;
        }

        return {
            pais: datos.pais,
            provincia: datos.provincia,
            canton: datos.canton,
            ciudad: datos.ciudad,
            parroquia: datos.parroquia,
            sector: datos.sector,
            direccion: datos.direccion,
            principal: datos.principal
        };
    }
}