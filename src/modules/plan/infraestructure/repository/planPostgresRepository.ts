import { Op, QueryTypes, literal, where } from "sequelize";
import { IPlan } from "../../domain/model/iPlan.js";
import {
    IPlanRepository,
    IFiltroPlanes,
    IResultadoPlanes
} from "../../domain/repository/iPlanRepository.js";
import { PlanModel } from "../model/planModel.js";
import { UsuarioModel } from "../../../usuario/infrastructure/model/usuarioModel.js";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class PlanPostgresRepository implements IPlanRepository {

    async crear(plan: IPlan): Promise<IPlan> {
        const maximo = await PlanModel.max("cplan");
        const cplan = Number(maximo ?? 0) + 1;

        const nuevo = await PlanModel.create({ ...plan, cplan });
        return nuevo.get({ plain: true }) as IPlan;
    }

    async listarPorUsuario(cusuario: string): Promise<IPlan[]> {
        const planes = await PlanModel.findAll({
            where: { cusuario },
            include: [{
                model: UsuarioModel,
                as: "usuario",
                attributes: ["nombres", "apellidos"]
            }],
            order: [["cplan", "DESC"]]
        });

        return planes.map(plan => plan.get({ plain: true }) as IPlan);
    }

    async listarPublicos(): Promise<IPlan[]> {
        const planes = await PlanModel.findAll({
            where: { publico: 1 },
            include: [{
                model: UsuarioModel,
                as: "usuario",
                attributes: ["nombres", "apellidos"]
            }],
            order: [["cplan", "DESC"]]
        });

        return planes.map(plan => plan.get({ plain: true }) as IPlan);
    }

    async buscarPublicosFiltrados(filtros: IFiltroPlanes): Promise<IResultadoPlanes> {
        const { cusuario, intereses, presupuesto, distancia, latitud, longitud, pagina, limite } = filtros;

        if (!Number.isInteger(pagina) || pagina < 1)
            throw new Error("La pagina debe ser un entero mayor a cero");

        if (!Number.isInteger(limite) || limite < 1 || limite > 100)
            throw new Error("El limite debe estar entre 1 y 100");

        if (intereses !== undefined && (!Array.isArray(intereses) ||
            intereses.some(id => !Number.isInteger(id) || id <= 0)))
            throw new Error("Los intereses seleccionados no son validos");

        if (presupuesto !== undefined && (!Number.isFinite(presupuesto) || presupuesto < 0))
            throw new Error("El presupuesto no es valido");

        if (distancia !== undefined && (!Number.isFinite(distancia) || distancia < 0))
            throw new Error("La distancia no es valida");

        if (distancia !== undefined && (latitud === undefined || longitud === undefined))
            throw new Error("Debes indicar tu ubicacion para filtrar por distancia");

        if (latitud !== undefined && (!Number.isFinite(latitud) || latitud < -90 || latitud > 90))
            throw new Error("La latitud no es valida");

        if (longitud !== undefined && (!Number.isFinite(longitud) || longitud < -180 || longitud > 180))
            throw new Error("La longitud no es valida");

        let condicionDistancia;

        if (distancia !== undefined && latitud !== undefined && longitud !== undefined) {
            const calculoDistancia = `
                6371 * ACOS(
                    LEAST(1, GREATEST(-1,
                        COS(RADIANS(${latitud})) *
                        COS(RADIANS(CAST("Plan"."latitud" AS DOUBLE PRECISION))) *
                        COS(
                            RADIANS(CAST("Plan"."longitud" AS DOUBLE PRECISION)) -
                            RADIANS(${longitud})
                        ) +
                        SIN(RADIANS(${latitud})) *
                        SIN(RADIANS(CAST("Plan"."latitud" AS DOUBLE PRECISION)))
                    ))
                )
            `;

            condicionDistancia = where(literal(calculoDistancia), Op.lte, distancia);
        }

        const condiciones = {
            publico: 1,
            estado: "PLANIFICADO",
            ...(cusuario ? {
                cusuario: { [Op.ne]: cusuario }
            } : {}),
            ...(intereses?.length ? {
                cinteres: { [Op.in]: intereses }
            } : {}),
            ...(presupuesto !== undefined ? {
                costoestimado: { [Op.lte]: presupuesto }
            } : {}),
            ...(condicionDistancia ? {
                latitud: { [Op.ne]: null },
                longitud: { [Op.ne]: null },
                [Op.and]: condicionDistancia
            } : {})
        };

        const condicionCupo = literal(`(
            "Plan"."cupomaximo" IS NULL OR
            "Plan"."cupomaximo" > (
                SELECT COUNT(*)
                FROM public."PLANPARTICIPANTE" AS pp
                WHERE pp."cplan" = "Plan"."cplan"
                  AND pp."estado" = 'CONFIRMADO'
                  AND pp."cusuario" <> "Plan"."cusuario"
            )
        )`);

        const resultado = await PlanModel.findAndCountAll({
            where: { [Op.and]: [condiciones, condicionCupo] },
            include: [{
                model: UsuarioModel,
                as: "usuario",
                attributes: ["nombres", "apellidos"]
            }],
            order: [["cplan", "DESC"]],
            limit: limite,
            offset: (pagina - 1) * limite,
            distinct: true
        });

        return {
            planes: resultado.rows.map(plan => plan.get({ plain: true }) as IPlan),
            total: resultado.count,
            pagina,
            limite,
            totalPaginas: Math.ceil(resultado.count / limite)
        };
    }

    async buscarPorId(cplan: number): Promise<IPlan | null> {
        const plan = await PlanModel.findByPk(cplan, {
            include: [{
                model: UsuarioModel,
                as: "usuario",
                attributes: ["nombres", "apellidos"]
            }]
        });

        return plan ? plan.get({ plain: true }) as IPlan : null;
    }

    async actualizar(cplan: number, datos: Partial<IPlan>): Promise<IPlan | null> {
        return sequelize.transaction(async transaction => {
            const plan = await PlanModel.findByPk(cplan, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!plan) return null;

            if (datos.cupomaximo != null) {
                const [resultado] = await sequelize.query<{ inscritos: string }>(
                    `SELECT COUNT(*) AS inscritos
                 FROM public."PLANPARTICIPANTE"
                 WHERE cplan = :cplan
                   AND estado = 'CONFIRMADO'
                   AND cusuario <> :creador`,
                    {
                        replacements: { cplan, creador: plan.cusuario },
                        type: QueryTypes.SELECT,
                        transaction
                    }
                );

                const inscritos = Number(resultado.inscritos);
                if (datos.cupomaximo < inscritos)
                    throw new Error(`El cupo máximo debe ser de al menos ${inscritos} porque ya hay participantes confirmados`);
            }

            await plan.update(datos, { transaction });
            return plan.get({ plain: true }) as IPlan;
        });
    }
}