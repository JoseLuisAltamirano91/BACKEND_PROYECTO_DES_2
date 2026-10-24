import type { Request, Response, NextFunction } from "express";
import {ITokenService} from "../../application/iTokenService.js";

export class AuthMiddleware {
    constructor(private readonly tokenService: ITokenService) {}

    autenticar = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const authorization = req.headers.authorization;
        const partes = authorization?.trim().split(/\s+/);

        if (
            !partes ||
            partes.length !== 2 ||
            partes[0]?.toLowerCase() !== "bearer" ||
            !partes[1]
        ) {
            res.status(401).json({
                mensaje: "Se requiere un token Bearer"
            });
            return;
        }

        try {
            const usuario = this.tokenService.verificar(partes[1]);
            res.locals.usuario = usuario;
        } catch {
            res.status(401).json({
                mensaje: "Token inválido o expirado"
            });
            return;
        }

        next();
    };
}