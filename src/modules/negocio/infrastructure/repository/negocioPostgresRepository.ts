import type { INegocio } from "../../domain/model/iNegocio.js";
import {INegocioRepository} from "../../domain/repository/iNegocioRepository.js";
import {NegocioModel} from "../model/negocioModel.js";
import {INegocioDto} from "../../domain/dto/iNegocioDto.js";
import {UsuarioRolModel} from "../../../usuario/infrastructure/model/usuarioRolModel.js";
import {RolModel} from "../../../usuario/infrastructure/model/rolModel.js";
import {sequelize} from "../../../../shared/infrastructure/config/sequelize.js";

export class NegocioPostgresRepository implements INegocioRepository {
    async crear(cusuario: string, datos: INegocioDto): Promise<INegocio> {
        return sequelize.transaction(async (transaction) => {
            const rol = await RolModel.findOne({
                where: {
                    nombre: "NEGOCIO",
                    activo: 1
                },
                transaction
            });

            if (!rol) {
                throw new Error("No existe el rol NEGOCIO activo");
            }

            const ahora = new Date();
            const fechaCreacion =
                ahora.getFullYear() * 10000 +
                (ahora.getMonth() + 1) * 100 +
                ahora.getDate();

            const negocio = await NegocioModel.create(
                {
                    cusuario,
                    nombre: datos.nombre.trim(),
                    descripcion: datos.descripcion?.trim() || null,
                    telefono: datos.telefono?.trim() || null,
                    correo: datos.correo?.trim().toLowerCase() || null,
                    activo: 1,
                    fcreacion: fechaCreacion,
                    fingreso: ahora,
                    fmodificacion: null,
                    cusuarioing: cusuario,
                    cusuariomod: null
                },
                { transaction }
            );

            const [asignacion] = await UsuarioRolModel.findOrCreate({
                where: {
                    cusuario,
                    crol: rol.crol
                },
                defaults: {
                    activo: 1
                },
                transaction
            });

            if (Number(asignacion.activo) !== 1) {
                await asignacion.update(
                    { activo: 1 },
                    { transaction }
                );
            }

            return {
                cnegocio: negocio.cnegocio,
                cusuario: negocio.cusuario,
                nombre: negocio.nombre,
                descripcion: negocio.descripcion,
                telefono: negocio.telefono,
                correo: negocio.correo,
                activo: Number(negocio.activo) === 1,
                fcreacion: negocio.fcreacion === null
                    ? null
                    : Number(negocio.fcreacion),
                fingreso: negocio.fingreso,
                fmodificacion: negocio.fmodificacion,
                cusuarioing: negocio.cusuarioing,
                cusuariomod: negocio.cusuariomod
            };
        });
    }

    async listarPorUsuario(cusuario: string): Promise<INegocio[]> {
        const negocios = await NegocioModel.findAll({
            where: {
                cusuario
            },
            order: [["cnegocio", "DESC"]]
        });

        return negocios.map((negocio) => ({
            cnegocio: negocio.cnegocio,
            cusuario: negocio.cusuario,
            nombre: negocio.nombre,
            descripcion: negocio.descripcion,
            telefono: negocio.telefono,
            correo: negocio.correo,
            activo: Number(negocio.activo) === 1,
            fcreacion: negocio.fcreacion === null
                ? null
                : Number(negocio.fcreacion),
            fingreso: negocio.fingreso,
            fmodificacion: negocio.fmodificacion,
            cusuarioing: negocio.cusuarioing,
            cusuariomod: negocio.cusuariomod
        }));
    }

    async actualizar(
        cnegocio: number,
        cusuario: string,
        datos: INegocioDto
    ): Promise<INegocio | null> {
        const [, negocios] = await NegocioModel.update(
            {
                nombre: datos.nombre.trim(),
                descripcion: datos.descripcion?.trim() || null,
                telefono: datos.telefono?.trim() || null,
                correo: datos.correo?.trim().toLowerCase() || null,
                fmodificacion: new Date(),
                cusuariomod: cusuario
            },
            {
                where: {
                    cnegocio,
                    cusuario
                },
                returning: true
            }
        );

        const negocio = negocios[0];

        if (!negocio) {
            return null;
        }

        return {
            cnegocio: negocio.cnegocio,
            cusuario: negocio.cusuario,
            nombre: negocio.nombre,
            descripcion: negocio.descripcion,
            telefono: negocio.telefono,
            correo: negocio.correo,
            activo: Number(negocio.activo) === 1,
            fcreacion: negocio.fcreacion === null
                ? null
                : Number(negocio.fcreacion),
            fingreso: negocio.fingreso,
            fmodificacion: negocio.fmodificacion,
            cusuarioing: negocio.cusuarioing,
            cusuariomod: negocio.cusuariomod
        };
    }
}