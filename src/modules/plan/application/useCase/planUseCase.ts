
import {
    IPlanRepository,
    IFiltroPlanes,
    IResultadoPlanes
} from "../../domain/repository/iPlanRepository.js";
import { IPlanDto } from "../../domain/dto/iPlanDto.js";
import { IPlan } from "../../domain/model/iPlan.js";
import { IPlanParticipanteRepository } from "../../../planParticipante/domain/repository/iPlanParticipanteRepository.js";
import type { INegocioRepository } from "../../../negocio/domain/repository/iNegocioRepository.js";
import type { ISucursalRepository } from "../../../sucursal/domain/repository/iSucursalRepository.js";

export class PlanUseCase {
    constructor(
        private readonly repository: IPlanRepository,
        private readonly participanteRepository: IPlanParticipanteRepository,
        private readonly negocioRepository: INegocioRepository,
        private readonly sucursalRepository: ISucursalRepository
    ) {}

    private async validarNegocioDelUsuario(cusuario: string, cnegocio?: number | null): Promise<void> {
        if (cnegocio == null) return;

        const negocios = await this.negocioRepository.listarPorUsuario(cusuario);
        if (!negocios.some(negocio => negocio.cnegocio === cnegocio))
            throw new Error("Solo puedes publicar planes a nombre de uno de tus negocios");
    }

    private validarDatos(dto: Partial<IPlanDto>): void {
        if (dto.costoestimado !== undefined && dto.costoestimado !== null) {
            if (String(dto.costoestimado).trim() === "" || !Number.isFinite(Number(dto.costoestimado)) || Number(dto.costoestimado) < 0)
                throw new Error("El costo estimado debe ser un numero mayor o igual a cero");
        }

        if (dto.cupomaximo != null &&
            (!Number.isInteger(dto.cupomaximo) || dto.cupomaximo < 1 || dto.cupomaximo > 99999))
            throw new Error("El cupo maximo debe ser un entero entre 1 y 99999");

        if (dto.latitud !== undefined && dto.latitud !== null) {
            if (String(dto.latitud).trim() === "" || !Number.isFinite(Number(dto.latitud)) || Number(dto.latitud) < -90 || Number(dto.latitud) > 90)
                throw new Error("La latitud debe estar entre -90 y 90");
        }

        if (dto.longitud !== undefined && dto.longitud !== null) {
            if (String(dto.longitud).trim() === "" || !Number.isFinite(Number(dto.longitud)) || Number(dto.longitud) < -180 || Number(dto.longitud) > 180)
                throw new Error("La longitud debe estar entre -180 y 180");
        }

        if ((dto.latitud === null) !== (dto.longitud === null) &&
            dto.latitud !== undefined && dto.longitud !== undefined)
            throw new Error("La latitud y longitud deben registrarse juntas");

        if (dto.cinteres !== undefined && dto.cinteres !== null &&
            (!Number.isInteger(dto.cinteres) || dto.cinteres <= 0))
            throw new Error("El interes seleccionado no es valido");

        if (dto.cnegocio !== undefined && dto.cnegocio !== null &&
            (!Number.isInteger(dto.cnegocio) || dto.cnegocio <= 0))
            throw new Error("El negocio seleccionado no es valido");
    }

    async crear(cusuario: string, dto: IPlanDto): Promise<IPlan> {
        if (!dto.nombre?.trim()) throw new Error("El nombre del plan es obligatorio");

        if (dto.fechainicio && dto.fechafin && new Date(dto.fechafin) < new Date(dto.fechainicio))
            throw new Error("La fecha final no puede ser anterior a la inicial");

        if (dto.publico !== undefined && dto.publico !== 0 && dto.publico !== 1)
            throw new Error("El campo publico debe ser 0 o 1");

        this.validarDatos(dto);
        await this.validarNegocioDelUsuario(cusuario, dto.cnegocio);
        await this.validarSucursalDelNegocio(
            dto.cnegocio ?? null,
            dto.csucursal ?? null
        );

        const plan: IPlan = {
            cplan: 0,
            cusuario,
            cinteres: dto.cinteres ?? null,
            cnegocio: dto.cnegocio ?? null,
            csucursal: dto.csucursal ?? null,
            nombre: dto.nombre.trim(),
            descripcion: dto.descripcion ?? null,
            fechainicio: dto.fechainicio ?? null,
            fechafin: dto.fechafin ?? null,
            costoestimado: dto.costoestimado != null ? String(dto.costoestimado) : null,
            cupomaximo: dto.cupomaximo ?? null,
            latitud: dto.latitud != null ? String(dto.latitud) : null,
            longitud: dto.longitud != null ? String(dto.longitud) : null,
            lugar: dto.lugar?.trim() || null,
            estado: "PLANIFICADO",
            publico: dto.publico ?? 0,
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        };

        if ((plan.latitud === null) !== (plan.longitud === null))
            throw new Error("La latitud y longitud deben registrarse juntas");

        const nuevoPlan = await this.repository.crear(plan);

        await this.participanteRepository.crear({
            cplan: nuevoPlan.cplan,
            cusuario,
            estado: "CONFIRMADO",
            fingreso: new Date(),
            fmodificacion: null,
            cusuarioing: cusuario,
            cusuariomod: null
        });

        return nuevoPlan;
    }

    async listarPorUsuario(cusuario: string): Promise<IPlan[]> {
        const creados = await this.repository.listarPorUsuario(cusuario);
        const participaciones = await this.participanteRepository.listarPorUsuario(cusuario);

        const planes = new Map<number, IPlan>();

        for (const plan of creados) {
            planes.set(Number(plan.cplan), plan);
        }

        for (const participacion of participaciones) {
            if (!["CONFIRMADO", "PENDIENTE"].includes(participacion.estado)) continue;

            const cplan = Number(participacion.cplan);
            if (planes.has(cplan)) continue;

            const plan = await this.repository.buscarPorId(cplan);
            if (plan) planes.set(cplan, plan);
        }

        return Array.from(planes.values())
            .sort((a, b) => Number(b.cplan) - Number(a.cplan));
    }

    async listarPublicos(cusuario: string): Promise<IPlan[]> {
        const planes = await this.repository.listarPublicos();
        return planes.filter(plan => plan.cusuario !== cusuario);
    }

    async buscarPublicosFiltrados(filtros: IFiltroPlanes): Promise<IResultadoPlanes> {
        return this.repository.buscarPublicosFiltrados(filtros);
    }

    async buscarPorId(cplan: number, cusuario: string): Promise<IPlan | null> {
        const plan = await this.repository.buscarPorId(cplan);
        if (!plan || plan.cusuario !== cusuario) return null;
        return plan;
    }

    async actualizar(cplan: number, cusuario: string, dto: Partial<IPlanDto>): Promise<IPlan | null> {
        const plan = await this.buscarPorId(cplan, cusuario);
        if (!plan) return null;

        if (dto.nombre !== undefined && !dto.nombre?.trim())
            throw new Error("El nombre del plan es obligatorio");

        const fechainicio = dto.fechainicio !== undefined ? dto.fechainicio : plan.fechainicio;
        const fechafin = dto.fechafin !== undefined ? dto.fechafin : plan.fechafin;

        if (fechainicio && fechafin && new Date(fechafin) < new Date(fechainicio))
            throw new Error("La fecha final no puede ser anterior a la inicial");

        if (dto.publico !== undefined && dto.publico !== 0 && dto.publico !== 1)
            throw new Error("El campo publico debe ser 0 o 1");

        this.validarDatos(dto);

        const cnegocioFinal = dto.cnegocio !== undefined
            ? dto.cnegocio
            : plan.cnegocio;

        const csucursalFinal = dto.csucursal !== undefined
            ? dto.csucursal
            : plan.csucursal;

        await this.validarNegocioDelUsuario(cusuario, cnegocioFinal);
        await this.validarSucursalDelNegocio(
            cnegocioFinal ?? null,
            csucursalFinal ?? null
        );

        const latitud = dto.latitud !== undefined ? dto.latitud : plan.latitud;
        const longitud = dto.longitud !== undefined ? dto.longitud : plan.longitud;

        if ((latitud == null) !== (longitud == null))
            throw new Error("La latitud y longitud deben registrarse juntas");

        return this.repository.actualizar(cplan, {
            ...(dto.nombre !== undefined && { nombre: dto.nombre.trim() }),
            ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
            ...(dto.fechainicio !== undefined && { fechainicio: dto.fechainicio }),
            ...(dto.fechafin !== undefined && { fechafin: dto.fechafin }),
            ...(dto.cinteres !== undefined && { cinteres: dto.cinteres }),
            ...(dto.cnegocio !== undefined && { cnegocio: dto.cnegocio }),
            ...(dto.csucursal !== undefined && { csucursal: dto.csucursal }),
            ...(dto.costoestimado !== undefined && {
                costoestimado: dto.costoestimado === null ? null : String(dto.costoestimado)
            }),
            ...(dto.cupomaximo !== undefined && { cupomaximo: dto.cupomaximo }),
            ...(dto.latitud !== undefined && {
                latitud: dto.latitud === null ? null : String(dto.latitud)
            }),
            ...(dto.longitud !== undefined && {
                longitud: dto.longitud === null ? null : String(dto.longitud)
            }),
            ...(dto.lugar !== undefined && { lugar: dto.lugar?.trim() || null }),
            ...(dto.estado !== undefined && { estado: dto.estado }),
            ...(dto.publico !== undefined && { publico: dto.publico }),
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });
    }


    private async validarSucursalDelNegocio(
        cnegocio: number | null,
        csucursal: number | null
    ): Promise<void> {
        if (cnegocio === null && csucursal === null) return;

        if (cnegocio === null || csucursal === null)
            throw new Error("Debes seleccionar un negocio y una sucursal");

        if (!Number.isInteger(csucursal) || csucursal <= 0)
            throw new Error("La sucursal seleccionada no es válida");

        const sucursal = await this.sucursalRepository.buscarPorId(csucursal);

        if (!sucursal)
            throw new Error("La sucursal seleccionada no existe");

        if (Number(sucursal.activo) !== 1)
            throw new Error("La sucursal seleccionada está inactiva");

        if (Number(sucursal.cnegocio) !== cnegocio)
            throw new Error("La sucursal no pertenece al negocio seleccionado");
    }

}
