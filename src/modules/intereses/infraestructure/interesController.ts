import type { Request, Response } from "express";
import { InteresUseCase } from "../application/useCase/interesUseCase.js";
import type { IInteresDto } from "../domain/dto/iInteresDto.js";
import type { ITokenPayload } from "../../../shared/application/iTokenPayload.js";

export class InteresController {

    constructor(
        private readonly useCase: InteresUseCase
    ) {}

    crear = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const interes = await this.useCase.crear(datos, usuario.cusuario);

            res.status(201).json({
                mensaje: "Interés registrado correctamente",
                interes
            });
        } catch {
            res.status(500).json({
                mensaje: "No se pudo registrar el interés"
            });
        }
    };

    listar = async (_req: Request, res: Response): Promise<void> => {
        try {
            const intereses = await this.useCase.listar();

            res.status(200).json({ intereses });
        } catch {
            res.status(500).json({
                mensaje: "No se pudieron consultar los intereses"
            });
        }
    };

    actualizar = async (req: Request, res: Response): Promise<void> => {
        const usuario = this.obtenerUsuario(res);
        if (!usuario) return;

        const codigo = req.params.cinteres;

        if (
            typeof codigo !== "string" ||
            !/^[1-9]\d*$/.test(codigo) ||
            Number(codigo) > 99999
        ) {
            res.status(400).json({
                mensaje: "Código de interés inválido"
            });
            return;
        }

        const datos = this.validarDatos(req, res);
        if (!datos) return;

        try {
            const interes = await this.useCase.actualizar(
                Number(codigo),
                datos,
                usuario.cusuario
            );

            res.status(200).json({
                mensaje: "Interés actualizado correctamente",
                interes
            });
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "";

            res.status(mensaje === "Interés no encontrado" ? 404 : 500).json({
                mensaje: mensaje === "Interés no encontrado"
                    ? mensaje
                    : "No se pudo actualizar el interés"
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

    private validarDatos(req: Request, res: Response): IInteresDto | null {
        const datos: Record<string, unknown> = req.body ?? {};
        const { nombre, descripcion, activo } = datos;

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            nombre.trim().length > 100
        ) {
            res.status(400).json({
                mensaje: "El nombre es obligatorio y admite hasta 100 caracteres"
            });
            return null;
        }

        if (
            descripcion !== undefined &&
            descripcion !== null &&
            (typeof descripcion !== "string" ||
                descripcion.trim().length > 250)
        ) {
            res.status(400).json({
                mensaje: "La descripción debe ser un texto de hasta 250 caracteres"
            });
            return null;
        }

        if (
            activo !== undefined &&
            typeof activo !== "boolean"
        ) {
            res.status(400).json({
                mensaje: "Activo debe ser verdadero o falso"
            });
            return null;
        }

        return {
            nombre: nombre.trim(),
            descripcion: descripcion as string | null | undefined,
            activo: activo as boolean | undefined
        };
    }
}