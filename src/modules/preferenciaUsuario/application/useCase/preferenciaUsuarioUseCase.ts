import type { IPreferenciaUsuarioRepository } from "../../domain/repository/iPreferenciaUsuarioRepository.js";
import type { IPreferenciaUsuarioDto } from "../../domain/dto/iPreferenciaUsuarioDto.js";

export class PreferenciaUsuarioUseCase {

    constructor(
        private readonly repository: IPreferenciaUsuarioRepository
    ) {}

    async crear(cusuario: string, datos: IPreferenciaUsuarioDto) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        const existe = await this.repository.obtenerPorUsuario(cusuario);

        if (existe) {
            throw new Error("El usuario ya tiene preferencias registradas");
        }

        return this.repository.crear(cusuario, datos);
    }

    async obtenerPorUsuario(cusuario: string) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        return this.repository.obtenerPorUsuario(cusuario);
    }

    async actualizar(cusuario: string, datos: IPreferenciaUsuarioDto) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        const preferencia = await this.repository.actualizar(
            cusuario,
            datos
        );

        if (!preferencia) {
            throw new Error("Preferencias no encontradas");
        }

        return preferencia;
    }
}