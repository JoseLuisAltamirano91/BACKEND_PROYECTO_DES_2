import { randomUUID } from "node:crypto";
import type { IRegistroUsuario } from "../dtos/iRegistroUsuario.js";
import type { IUsuarioRepository } from "../ports/iUsuarioRepository.js";
import type { IPasswordService } from "../ports/iPasswordService.js";

export class CorreoYaRegistradoError extends Error {
    constructor() {
        super("El correo ya está registrado");
        this.name = "CorreoYaRegistradoError";
    }
}

export class RegistroUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly passwordService: IPasswordService
    ) {}

    async ejecutar(datos: IRegistroUsuario): Promise<{ cusuario: string }> {
        const correo = datos.correo.trim().toLowerCase();

        const existente = await this.usuarioRepository.buscarPorCorreo(correo);

        if (existente) {
            throw new CorreoYaRegistradoError();
        }
        
        const cusuario = randomUUID().replace(/-/g, "").toUpperCase();
        const passwordHash = await this.passwordService.generarHash(
            datos.password
        );

        await this.usuarioRepository.crear({
            cusuario,
            nombres: datos.nombres.trim(),
            apellidos: datos.apellidos.trim(),
            correo,
            passwordHash
        });

        return { cusuario };
    }
}