import type { Request, Response, NextFunction } from "express";
import {ITokenPayload} from "../../application/iTokenPayload.js";

export function autorizarRoles(...rolesPermitidos: string[]) {
    return (_req: Request, res: Response, next: NextFunction): void => {
        const usuario = res.locals.usuario as ITokenPayload | undefined;

        if (!usuario) {
            res.status(401).json({
                mensaje: "Se requiere autenticación"
            });
            return;
        }

        const tienePermiso = usuario.roles.some(
            rol => rolesPermitidos.includes(rol)
        );

        if (!tienePermiso) {
            res.status(403).json({
                mensaje: "No tienes permisos para acceder"
            });
            return;
        }

        next();
    };
}