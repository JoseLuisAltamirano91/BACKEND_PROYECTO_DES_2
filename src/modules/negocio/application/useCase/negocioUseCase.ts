import {INegocioRepository} from "../../domain/repository/iNegocioRepository.js";
import {INegocio} from "../../domain/model/iNegocio.js";
import {INegocioDto} from "../../domain/dto/iNegocioDto.js";


export class NegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async crear(
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio> {
        return this.negocioRepository.crear(cusuario, datos);
    }

    async listarPorNegocio(cusuario: string): Promise<INegocio[]> {
        return this.negocioRepository.listarPorUsuario(cusuario);
    }

    async actualizar(
        cnegocio: number,
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio | null> {
        return this.negocioRepository.actualizar(
            cnegocio,
            cusuario,
            datos
        );
    }
}