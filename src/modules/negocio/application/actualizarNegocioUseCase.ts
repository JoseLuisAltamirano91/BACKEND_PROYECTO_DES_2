import {INegocioRepository} from "../domain/iNegocioRepository.js";
import {IActualizarNegocio} from "./dtos/iActualizarNegocio.js";
import {INegocio} from "../domain/iNegocio.js";


export class ActualizarNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
        cnegocio: number,
        cusuario: string,
        datos: IActualizarNegocio
    ): Promise<INegocio | null> {
        return this.negocioRepository.actualizar(
            cnegocio,
            cusuario,
            datos
        );
    }
}