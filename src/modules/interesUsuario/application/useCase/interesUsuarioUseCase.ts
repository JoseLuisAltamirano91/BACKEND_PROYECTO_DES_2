import type { IInteresUsuarioRepository } from "../../domain/repository/iInteresUsuarioRepository.js";

export class InteresUsuarioUseCase {

    constructor(
        private readonly repository: IInteresUsuarioRepository
    ) {}

    async agregar(cusuario: string, cinteres: number) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        if (!Number.isInteger(cinteres) || cinteres <= 0 || cinteres > 99999) {
            throw new Error("Código de interés inválido");
        }

        return this.repository.agregar(cusuario, cinteres);
    }

    async listarPorUsuario(cusuario: string) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        return this.repository.listarPorUsuario(cusuario);
    }

    async eliminar(cusuario: string, cinteres: number) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        if (!Number.isInteger(cinteres) || cinteres <= 0 || cinteres > 99999) {
            throw new Error("Código de interés inválido");
        }

        const eliminado = await this.repository.eliminar(cusuario, cinteres);

        if (!eliminado) {
            throw new Error("El usuario no tiene registrado ese interés");
        }

        return true;
    }
}