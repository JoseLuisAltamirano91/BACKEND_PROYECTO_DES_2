
import { IFavorito } from "../../domain/model/iFavorito.js";
import { IFavoritoRepository } from "../../domain/repository/iFavoritoRepository.js";
import { FavoritoModel } from "../model/favoritoModel.js";

export class FavoritoPostgresRepository implements IFavoritoRepository {

    async crear(favorito: IFavorito): Promise<IFavorito> {
        const maximo = await FavoritoModel.max("cfavorito");
        const cfavorito = Number(maximo ?? 0) + 1;

        const nuevo = await FavoritoModel.create({ ...favorito, cfavorito });
        return nuevo.get({ plain: true }) as IFavorito;
    }

    async listarPorUsuario(cusuario: string): Promise<IFavorito[]> {
        const favoritos = await FavoritoModel.findAll({
            where: { cusuario },
            order: [["cfavorito", "DESC"]]
        });
        return favoritos.map(f => f.get({ plain: true }) as IFavorito);
    }

    async buscarPorId(cfavorito: number): Promise<IFavorito | null> {
        const favorito = await FavoritoModel.findByPk(cfavorito);
        return favorito ? favorito.get({ plain: true }) as IFavorito : null;
    }

    async buscarPorReferencia(cusuario: string, tipo: string, creferencia: string): Promise<IFavorito | null> {
        const favorito = await FavoritoModel.findOne({
            where: { cusuario, tipo, creferencia }
        });
        return favorito ? favorito.get({ plain: true }) as IFavorito : null;
    }

    async eliminar(cfavorito: number): Promise<boolean> {
        const eliminados = await FavoritoModel.destroy({
            where: { cfavorito }
        });
        return eliminados > 0;
    }
}
