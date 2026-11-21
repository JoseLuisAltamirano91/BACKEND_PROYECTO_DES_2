import { IGeograficoRepository } from "../../domain/repository/IGeograficoRepository";
import { Pais, Provincia, Canton, Parroquia } from "../../domain/model/geografico";
import { PaisModel } from "../model/paisModel";
import { ProvinciaModel } from "../model/provinciaModel";
import { CantonModel } from "../model/cantonModel";
import { ParroquiaModel } from "../model/parroquiaModel";

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