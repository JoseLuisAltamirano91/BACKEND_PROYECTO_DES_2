import type { INegocio } from "../../domain/models/iNegocio.js";
import type { IRegistroNegocio } from "../dtos/iRegistroNegocio.js";
import type { INegocioRepository } from "../ports/iNegocioRepository.js";

export class RegistroNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cusuario: string,
        datos: IRegistroNegocio
    ): Promise<INegocio> {
        return this.negocioRepository.crear(cusuario, datos);
    }
}