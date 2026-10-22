import type { IUsuario } from "../../domain/models/iUsuario.js";
import type { IUsuarioRepository } from "../ports/iUsuarioRepository.js";
import type { IPasswordService } from "../ports/iPasswordService.js";
import type { ITokenService } from "../ports/iTokenService.js";

export class CredencialesInvalidasError extends Error {
    constructor() {
        super("Correo o contraseña incorrectos");
        this.name = "CredencialesInvalidasError";
    }
}

interface ILoginResultado {
    token: string;
    usuario: Pick<
        IUsuario,
        "cusuario" | "nombres" | "apellidos" | "correo" | "roles"
    >;
}

export class LoginUseCase {
    constructor(
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly passwordService: IPasswordService,
        private readonly tokenService: ITokenService
    ) {}

    async ejecutar(
        correo: string,
        password: string
    ): Promise<ILoginResultado> {
        const usuario = await this.usuarioRepository.buscarPorCorreo(
            correo.trim()
        );

        if (!usuario) {
            throw new CredencialesInvalidasError();
        }

        const passwordValido = await this.passwordService.comparar(
            password,
            usuario.passwordHash
        );

        if (!passwordValido || !usuario.activo) {
            throw new CredencialesInvalidasError();
        }

        const token = this.tokenService.generar({
            cusuario: usuario.cusuario,
            roles: usuario.roles.map((rol) => rol.nombre)
        });

        return {
            token,
            usuario: {
                cusuario: usuario.cusuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                roles: usuario.roles
            }
        };
    }
}