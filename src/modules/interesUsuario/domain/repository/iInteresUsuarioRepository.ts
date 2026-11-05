import type { IInteresUsuario } from "../model/iInteresUsuario";
import type { IInteresUsuarioDto } from "../dto/iInteresUsuarioDto";

export interface IInteresUsuarioRepository {

    agregar(
        cusuario: string,
        cinteres: number
    ): Promise<IInteresUsuario>;

    listarPorUsuario(
        cusuario: string
    ): Promise<IInteresUsuario[]>;

    eliminar(
        cusuario: string,
        cinteres: number
    ): Promise<boolean>;
}