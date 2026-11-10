
import { IFavoritoRepository } from "../../domain/repository/iFavoritoRepository.js";
import { IFavoritoDto } from "../../domain/dto/iFavoritoDto.js";
import { IFavorito } from "../../domain/model/iFavorito.js";

export class FavoritoUseCase {
    constructor(private readonly repository: IFavoritoRepository) {}

    async crear(cusuario: string, dto: IFavoritoDto): Promise<IFavorito> {
        if (!dto || !["LUGAR", "ACTIVIDAD"].includes(dto.tipo))
            throw new Error("El tipo debe ser LUGAR o ACTIVIDAD");

        if (typeof dto.creferencia !== "string" || !dto.creferencia.trim())
            throw new Error("La referencia es obligatoria");

        const tipo = dto.tipo;
        const creferencia = dto.creferencia.trim();

        const existe = await this.repository.buscarPorReferencia(cusuario, tipo, creferencia);
        if (existe) throw new Error("Este favorito ya está registrado");

        const favorito: IFavorito = {
            cfavorito: 0,
            cusuario,
            tipo,
            creferencia,
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        };

        return this.repository.crear(favorito);
    }

    async listarPorUsuario(cusuario: string): Promise<IFavorito[]> {
        return this.repository.listarPorUsuario(cusuario);
    }

    async buscarPorId(cfavorito: number, cusuario: string): Promise<IFavorito | null> {
        const favorito = await this.repository.buscarPorId(cfavorito);
        if (!favorito || favorito.cusuario !== cusuario) return null;
        return favorito;
    }

    async eliminar(cfavorito: number, cusuario: string): Promise<boolean> {
        const favorito = await this.buscarPorId(cfavorito, cusuario);
        if (!favorito) return false;

        return this.repository.eliminar(cfavorito);
    }
}
