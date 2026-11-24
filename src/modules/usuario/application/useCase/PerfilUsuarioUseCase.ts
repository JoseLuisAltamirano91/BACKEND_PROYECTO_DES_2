import type {
    IUsuarioRepository,
    PerfilUsuario
} from "../../domain/repository/iUsuarioRepository.js";

export class DatosPerfilInvalidosError extends Error {}

export class PerfilUsuarioUseCase {
    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async consultar(cusuario: string): Promise<PerfilUsuario | null> {
        return this.usuarioRepository.buscarPerfil(cusuario);
    }

    async actualizar(
        cusuario: string,
        nombres: unknown,
        apellidos: unknown,
        telefono?: unknown
    ): Promise<PerfilUsuario | null> {
        if (typeof nombres !== "string" || !nombres.trim()) {
            throw new DatosPerfilInvalidosError("Los nombres son obligatorios");
        }

        if (typeof apellidos !== "string" || !apellidos.trim()) {
            throw new DatosPerfilInvalidosError("Los apellidos son obligatorios");
        }

        if (nombres.trim().length > 100 || apellidos.trim().length > 100) {
            throw new DatosPerfilInvalidosError(
                "Nombres y apellidos admiten hasta 100 caracteres cada uno"
            );
        }

        if (telefono !== undefined && telefono !== null && typeof telefono !== "string") {
            throw new DatosPerfilInvalidosError("El teléfono debe enviarse como texto");
        }

        return this.usuarioRepository.actualizarPerfil(
            cusuario,
            nombres.trim(),
            apellidos.trim(),
            telefono
        );
    }
}