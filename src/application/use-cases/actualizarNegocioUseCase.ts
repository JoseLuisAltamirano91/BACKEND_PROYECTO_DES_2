import type { INegocio } from "../../domain/models/iNegocio.js";
import type { IActualizarNegocio } from "../dtos/iActualizarNegocio.js";
import type { INegocioRepository } from "../ports/iNegocioRepository.js";

export class ActualizarNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cnegocio: number,
        cusuario: string,
        datos: IActualizarNegocio
    ): Promise<INegocio | null> {
        return this.negocioRepository.actualizar(
            cnegocio,
            cusuario,
            datos
        );
    }
}