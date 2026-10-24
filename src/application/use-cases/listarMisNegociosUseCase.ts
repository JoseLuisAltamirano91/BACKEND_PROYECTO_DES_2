import type { INegocio } from "../../domain/models/iNegocio.js";
import type { INegocioRepository } from "../ports/iNegocioRepository.js";

export class ListarMisNegociosUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(cusuario: string): Promise<INegocio[]> {
        return this.negocioRepository.listarPorUsuario(cusuario);
    }
}