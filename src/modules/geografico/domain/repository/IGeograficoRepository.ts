import { Pais, Provincia, Canton, Parroquia } from "../model/geografico.js";

export interface IGeograficoRepository {
    listarPaises(): Promise<Pais[]>;
    listarProvincias(cpais: number): Promise<Provincia[]>;
    listarCantones(cpais: number, cprovincia: number): Promise<Canton[]>;
    listarParroquias(cpais: number, cprovincia: number, ccanton: number): Promise<Parroquia[]>;
}