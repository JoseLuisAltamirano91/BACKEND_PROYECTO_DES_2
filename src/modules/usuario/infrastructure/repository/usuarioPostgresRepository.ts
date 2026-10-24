import { Op, fn, col, where } from "sequelize";
import {IUsuario} from "../../domain/model/iUsuario";
import {IUsuarioRepository} from "../../domain/repository/iUsuarioRepository";
import {INuevoUsuarioDto} from "../../domain/dto/iNuevoUsuarioDto";
import {UsuarioModel} from "../model/usuarioModel";
import {UsuarioRolModel} from "../model/usuarioRolModel";
import {RolModel} from "../model/rolModel";
import {sequelize} from "../../../../shared/infrastructure/config/sequelize";

export class UsuarioPostgresRepository implements IUsuarioRepository {

    async buscarPorCorreo(correo: string): Promise<IUsuario | null> {
        const usuarios = await UsuarioModel.findAll({
            where: where(
                fn("LOWER", fn("TRIM", col("correo"))),
                correo.trim().toLowerCase()
            ),
            limit: 2
        });

        if (usuarios.length > 1) {
            throw new Error("Existen usuarios con el mismo correo");
        }

        const usuario = usuarios[0];

        if (!usuario) {
            return null;
        }

        const asignaciones = await UsuarioRolModel.findAll({
            where: {
                cusuario: usuario.cusuario,
                activo: 1
            }
        });

        const codigosRol = asignaciones.map(
            (asignacion) => asignacion.crol
        );

        const roles = codigosRol.length > 0
            ? await RolModel.findAll({
                where: {
                    crol: { [Op.in]: codigosRol },
                    activo: 1
                },
                order: [["crol", "ASC"]]
            })
            : [];

        return {
            cusuario: usuario.cusuario,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            passwordHash: usuario.password,
            activo: Number(usuario.activo) === 1,
            roles: roles.map((rol) => ({
                crol: Number(rol.crol),
                nombre: rol.nombre
            }))
        };
    }


    async crear(usuario: INuevoUsuarioDto): Promise<void> {
        await sequelize.transaction(async (transaction) => {
            const rol = await RolModel.findOne({
                where: {
                    nombre: "USUARIO",
                    activo: 1
                },
                transaction
            });

            if (!rol) {
                throw new Error("No existe el rol USUARIO activo");
            }

            await UsuarioModel.create(
                {
                    cusuario: usuario.cusuario,
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    correo: usuario.correo.trim().toLowerCase(),
                    password: usuario.passwordHash,
                    activo: 1
                },
                { transaction }
            );

            await UsuarioRolModel.create(
                {
                    cusuario: usuario.cusuario,
                    crol: rol.crol,
                    activo: 1
                },
                { transaction }
            );
        });
    }
}