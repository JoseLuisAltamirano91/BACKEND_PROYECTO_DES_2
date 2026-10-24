import {INegocioRepository} from "../../domain/repository/iNegocioRepository";
import {INegocio} from "../../domain/model/iNegocio";
import {INegocioDto} from "../../domain/dto/INegocioDto";


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