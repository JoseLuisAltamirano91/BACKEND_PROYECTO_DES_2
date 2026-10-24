import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {INegocio} from "../domain/iNegocio.js";
import {IDatosNegocio} from "../domain/iDatosNegocio.js";


export class ActualizarNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cnegocio: number,
        cusuario: string,
        datos: IDatosNegocio
    ): Promise<INegocio | null> {
        return this.negocioRepository.actualizar(
            cnegocio,
            cusuario,
            datos
        );
    }
}