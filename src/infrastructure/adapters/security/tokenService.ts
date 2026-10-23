import "dotenv/config";
import jwt from "jsonwebtoken";
import type {ITokenService} from "../../../application/ports/iTokenService.js";
import {ITokenPayload} from "../../../application/dtos/iTokenPayload.js";

export class TokenService implements ITokenService {
    private readonly secret: string;

    constructor() {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("Falta configurar JWT_SECRET en .env");
        }

        this.secret = secret;
    }

    generar(payload: ITokenPayload): string {
        return jwt.sign(
            { roles: payload.roles },
            this.secret,
            {
                subject: payload.cusuario,
                algorithm: "HS256",
                expiresIn: "1h"
            }
        );
    }

    verificar(token: string): ITokenPayload {
        const payload = jwt.verify(token, this.secret, {
            algorithms: ["HS256"]
        });

        if (
            typeof payload === "string" ||
            typeof payload.sub !== "string" ||
            payload.sub.trim().length === 0 ||
            typeof payload.exp !== "number" ||
            !Number.isFinite(payload.exp) ||
            !Array.isArray(payload.roles) ||
            !payload.roles.every(
                (rol: unknown) => typeof rol === "string" && rol.trim().length > 0
            )
        ) {
            throw new Error("El token contiene datos inválidos");
        }

        return {
            cusuario: payload.sub,
            roles: payload.roles
        };
    }
}