import type { IInteresRepository } from "../../domain/repository/iInteresRepository.js";
import type { IInteresDto } from "../../domain/dto/iInteresDto.js";

export class InteresUseCase {

    constructor(
        private readonly repository: IInteresRepository
    ) {}

    async crear(datos: IInteresDto, cusuario: string) {
        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        if (!datos.nombre || !datos.nombre.trim()) {
            throw new Error("El nombre del interés es obligatorio");
        }

        return this.repository.crear(datos, cusuario);
    }

    async listar() {
        return this.repository.listar();
    }

    async actualizar(
        cinteres: number,
        datos: IInteresDto,
        cusuario: string
    ) {
        if (!Number.isInteger(cinteres) || cinteres <= 0) {
            throw new Error("Código de interés inválido");
        }

        if (!cusuario) {
            throw new Error("Usuario requerido");
        }

        if (!datos.nombre || !datos.nombre.trim()) {
            throw new Error("El nombre del interés es obligatorio");
        }

        const interes = await this.repository.actualizar(
            cinteres,
            datos,
            cusuario
        );

        if (!interes) {
            throw new Error("Interés no encontrado");
        }

        return interes;
    }
}