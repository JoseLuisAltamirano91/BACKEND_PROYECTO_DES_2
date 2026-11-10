
import { IFavorito } from "../model/iFavorito.js";

export interface IFavoritoRepository {
    crear(favorito: IFavorito): Promise<IFavorito>;
    listarPorUsuario(cusuario: string): Promise<IFavorito[]>;
    buscarPorId(cfavorito: number): Promise<IFavorito | null>;
    buscarPorReferencia(cusuario: string, tipo: string, creferencia: string): Promise<IFavorito | null>;
    eliminar(cfavorito: number): Promise<boolean>;
}
