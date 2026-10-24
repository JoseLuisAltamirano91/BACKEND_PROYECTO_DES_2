import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {INegocio} from "../domain/iNegocio.js";
import {IDatosNegocio} from "../domain/iDatosNegocio.js";


export class RegistroNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cusuario: string,
        datos: IDatosNegocio
    ): Promise<INegocio> {
        return this.negocioRepository.crear(cusuario, datos);
    }
}