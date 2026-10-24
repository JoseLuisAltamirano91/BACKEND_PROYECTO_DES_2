import {INegocioRepository} from "../../domain/repository/iNegocioRepository";
import {INegocio} from "../../domain/model/iNegocio";


export class ListarMisNegociosUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(cusuario: string): Promise<INegocio[]> {
        return this.negocioRepository.listarPorUsuario(cusuario);
    }
}