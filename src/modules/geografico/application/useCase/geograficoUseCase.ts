import { IGeograficoRepository } from "../../domain/repository/IGeograficoRepository";
import { Pais, Provincia, Canton, Parroquia } from "../../domain/model/geografico";

export class GeograficoUseCase {

    constructor(private readonly repository: IGeograficoRepository) {}

    async listarPaises(): Promise<Pais[]> {
        return await this.repository.listarPaises();
    }

    async listarProvincias(cpais: number): Promise<Provincia[]> {
        this.validarCodigo(cpais, "pais");
        return await this.repository.listarProvincias(cpais);
    }

    async listarCantones(cpais: number, cprovincia: number): Promise<Canton[]> {
        this.validarCodigo(cpais, "pais");
        this.validarCodigo(cprovincia, "provincia");
        return await this.repository.listarCantones(cpais, cprovincia);
    }

    async listarParroquias(cpais: number, cprovincia: number, ccanton: number): Promise<Parroquia[]> {
        this.validarCodigo(cpais, "pais");
        this.validarCodigo(cprovincia, "provincia");
        this.validarCodigo(ccanton, "canton");
        return await this.repository.listarParroquias(cpais, cprovincia, ccanton);
    }

    private validarCodigo(codigo: number, campo: string): void {
        if (!Number.isInteger(codigo) || codigo <= 0 || codigo > 99999) {
            throw new Error(`El codigo de ${campo} no es valido`);
        }
    }
}