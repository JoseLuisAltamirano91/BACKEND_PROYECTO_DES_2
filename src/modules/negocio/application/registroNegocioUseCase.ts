import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {INegocio} from "../domain/iNegocio.js";
import {IDatosNegocioDto} from "./dtos/iDatosNegocioDto";


export class RegistroNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cusuario: string,
        datos: IDatosNegocioDto
    ): Promise<INegocio> {
        return this.negocioRepository.crear(cusuario, datos);
    }
}