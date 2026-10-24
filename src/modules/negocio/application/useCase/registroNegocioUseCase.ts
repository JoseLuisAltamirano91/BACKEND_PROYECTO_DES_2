import {INegocioRepository} from "../../domain/repository/iNegocioRepository";
import {INegocio} from "../../domain/model/iNegocio";
import {INegocioDto} from "../../domain/dto/INegocioDto";


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