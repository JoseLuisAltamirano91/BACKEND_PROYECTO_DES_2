import { IDireccionUsuarioRepository } from "../../domain/repository/iDireccionUsuarioRepository";
import { IDireccionUsuarioDto } from "../../domain/dto/iDireccionUsuarioDto";

export class DireccionUsuarioUseCase {
    constructor(private readonly repository: IDireccionUsuarioRepository) {}

    async crear(cusuario: string, datos: IDireccionUsuarioDto) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        this.validarCoordenadas(datos);
        return this.repository.crear(cusuario, datos);
    }

    async listarPorUsuario(cusuario: string) {
        return this.repository.listarPorUsuario(cusuario);
    }

    async actualizar(cdireccion: number, cusuario: string, datos: IDireccionUsuarioDto) {
        if (!Number.isInteger(cdireccion) || cdireccion <= 0) {
            throw new Error("Código de dirección inválido");
        }

        this.validarCoordenadas(datos);

        const direccion = await this.repository.actualizar(cdireccion, cusuario, datos);

        if (!direccion) {
            throw new Error("Dirección no encontrada");
        }
        return direccion;
    }

    private validarCoordenadas(datos: IDireccionUsuarioDto): void {
        const { latitud, longitud } = datos;

        if (latitud != null &&
            (!Number.isFinite(latitud) || latitud < -90 || latitud > 90)) {
            throw new Error("Latitud inválida");
        }

        if (longitud != null &&
            (!Number.isFinite(longitud) || longitud < -180 || longitud > 180)) {
            throw new Error("Longitud inválida");
        }

        if ((latitud === undefined) !== (longitud === undefined) ||
            (latitud === null) !== (longitud === null)) {
            throw new Error("La latitud y longitud deben enviarse conjuntamente");
        }
    }

    async eliminar(cdireccion: number, cusuario: string): Promise<void> {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        if (!Number.isInteger(cdireccion) || cdireccion <= 0) {
            throw new Error("Código de dirección inválido");
        }

        const eliminado = await this.repository.eliminar(cdireccion, cusuario);

        if (!eliminado) {
            throw new Error("Dirección no encontrada");
        }
    }
}