import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {IRegistroNegocio} from "./dtos/iRegistroNegocio.js";
import {INegocio} from "../domain/iNegocio.js";


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