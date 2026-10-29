import {INegocioRepository} from "../../domain/repository/iNegocioRepository.js";
import {INegocio} from "../../domain/model/iNegocio.js";
import {INegocioDto} from "../../domain/dto/iNegocioDto.js";


export class ActualizarNegocioUseCase {
    constructor(
        private readonly negocioRepository: INegocioRepository
    ) {}

    async ejecutar(
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