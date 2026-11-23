import type { ISucursal } from "../../domain/model/iSucursal.js";
import type { ISucursalDto } from "../../domain/dto/iSucursalDto.js";
import type { ISucursalRepository } from "../../domain/repository/iSucursalRepository.js";
import type { INegocioRepository } from "../../../negocio/domain/repository/iNegocioRepository.js";

export class SucursalUseCase {
    constructor(
        private readonly repository: ISucursalRepository,
        private readonly negocioRepository: INegocioRepository
    ) {}

    async crear(
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal> {
        await this.validarNegocioDelUsuario(cnegocio, cusuario);
        return this.repository.crear(cnegocio, cusuario, this.validarDatos(datos));
    }

    async listarPorNegocio(cnegocio: number, cusuario: string): Promise<ISucursal[]> {
        await this.validarNegocioDelUsuario(cnegocio, cusuario);
        return this.repository.listarPorNegocio(cnegocio);
    }

    async actualizar(
        csucursal: number,
        cnegocio: number,
        cusuario: string,
        datos: ISucursalDto
    ): Promise<ISucursal | null> {
        if (!Number.isInteger(csucursal) || csucursal <= 0)
            throw new Error("El código de sucursal es inválido");

        await this.validarNegocioDelUsuario(cnegocio, cusuario);
        return this.repository.actualizar(csucursal, cnegocio, cusuario, this.validarDatos(datos));
    }

    private async validarNegocioDelUsuario(cnegocio: number, cusuario: string): Promise<void> {
        if (!Number.isInteger(cnegocio) || cnegocio <= 0)
            throw new Error("El código de negocio es inválido");

        const negocios = await this.negocioRepository.listarPorUsuario(cusuario);

        if (!negocios.some(negocio => negocio.cnegocio === cnegocio))
            throw new Error("Solo puedes administrar las sucursales de tus negocios");
    }

    private validarDatos(datos: ISucursalDto): ISucursalDto {
        const nombre = typeof datos?.nombre === "string" ? datos.nombre.trim() : "";
        const direccion = typeof datos?.direccion === "string" ? datos.direccion.trim() : "";

        if (!nombre || nombre.length > 100)
            throw new Error("El nombre de la sucursal debe tener entre 1 y 100 caracteres");

        if (!direccion || direccion.length > 500)
            throw new Error("La dirección debe tener entre 1 y 500 caracteres");

        const resultado: ISucursalDto = { nombre, direccion };
        const { telefono, activo, latitud, longitud } = datos;

        if (telefono !== undefined) {
            if (telefono !== null && typeof telefono !== "string")
                throw new Error("El teléfono debe ser texto");

            const numeroLimpio = telefono?.trim() ?? "";

            if (numeroLimpio.length > 25)
                throw new Error("El teléfono debe tener máximo 25 caracteres");

            resultado.telefono = numeroLimpio || null;
        }

        if (activo !== undefined) {
            if (activo !== 0 && activo !== 1)
                throw new Error("El estado activo debe ser 0 o 1");

            resultado.activo = activo;
        }

        if (latitud === undefined && longitud === undefined)
            return resultado;

        if (latitud === null && longitud === null)
            return { ...resultado, latitud: null, longitud: null };

        if (latitud == null || longitud == null)
            throw new Error("Debes enviar la latitud y la longitud juntas");

        return {
            ...resultado,
            latitud: this.validarCoordenada(latitud, 90, "latitud"),
            longitud: this.validarCoordenada(longitud, 180, "longitud")
        };
    }

    private validarCoordenada(valor: unknown, limite: number, campo: string): number {
        if (typeof valor !== "number" && (typeof valor !== "string" || !valor.trim()))
            throw new Error(`La ${campo} debe ser un número`);

        const numero = Number(valor);

        if (!Number.isFinite(numero) || numero < -limite || numero > limite)
            throw new Error(`La ${campo} debe estar entre ${-limite} y ${limite}`);

        return numero;
    }


    async listarPublicas(cnegocio: number): Promise<ISucursal[]> {
        if (!Number.isInteger(cnegocio) || cnegocio <= 0) {
            throw new Error("El código de negocio es inválido");
        }

        const negocio = await this.negocioRepository.buscarPublico(cnegocio);

        if (!negocio) {
            throw new Error("El negocio no existe o está inactivo");
        }

        const sucursales = await this.repository.listarPorNegocio(cnegocio);

        return sucursales.filter(sucursal => sucursal.activo);
    }


}