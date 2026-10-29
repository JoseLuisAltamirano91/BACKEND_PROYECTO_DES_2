import {INegocioRepository} from "../../domain/repository/iNegocioRepository.js";
import {INegocio} from "../../domain/model/iNegocio.js";
import {INegocioDto} from "../../domain/dto/iNegocioDto.js";


export class RegistroNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio> {
        return this.negocioRepository.crear(cusuario, datos);
    }
}