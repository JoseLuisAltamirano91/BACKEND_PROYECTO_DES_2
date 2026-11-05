import type { IInteres } from "../model/iInteres.js";
import type { IInteresDto } from "../dto/iInteresDto.js";

export interface IInteresRepository {
    crear(datos: IInteresDto, cusuario: string): Promise<IInteres>;

    listar(): Promise<IInteres[]>;

    actualizar(
        cinteres: number,
        datos: IInteresDto,
        cusuario: string
    ): Promise<IInteres | null>;
}