import { IGeograficoRepository } from "../../domain/repository/IGeograficoRepository.js";
import { Pais, Provincia, Canton, Parroquia } from "../../domain/model/geografico.js";
import { PaisModel } from "../model/paisModel.js";
import { ProvinciaModel } from "../model/provinciaModel.js";
import { CantonModel } from "../model/cantonModel.js";
import { ParroquiaModel } from "../model/parroquiaModel.js";

export class GeograficoPostgresRepository implements IGeograficoRepository {

    async listarPaises(): Promise<Pais[]> {
        return await PaisModel.findAll({
            where: { activo: 1 },
            order: [["nombre", "ASC"]]
        });
    }

    async listarProvincias(cpais: number): Promise<Provincia[]> {
        return await ProvinciaModel.findAll({
            where: { cpais, activo: 1 },
            order: [["nombre", "ASC"]]
        });
    }

    async listarCantones(cpais: number, cprovincia: number): Promise<Canton[]> {
        return await CantonModel.findAll({
            where: { cpais, cprovincia, activo: 1 },
            order: [["nombre", "ASC"]]
        });
    }

    async listarParroquias(cpais: number, cprovincia: number, ccanton: number): Promise<Parroquia[]> {
        return await ParroquiaModel.findAll({
            where: { cpais, cprovincia, ccanton, activo: 1 },
            order: [["nombre", "ASC"]]
        });
    }
}