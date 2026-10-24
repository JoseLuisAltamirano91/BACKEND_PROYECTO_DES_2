import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {IDatosNegocioDto} from "./dtos/iDatosNegocioDto";
import {INegocio} from "../domain/iNegocio.js";


export class ActualizarNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cnegocio: number,
        cusuario: string,
        datos: IDatosNegocioDto
    ): Promise<INegocio | null> {
        return this.negocioRepository.actualizar(
            cnegocio,
            cusuario,
            datos
        );
    }
}