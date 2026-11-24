import { Op, fn, col, where } from "sequelize";
import {IUsuario} from "../../domain/model/iUsuario.js";
import {IUsuarioRepository, PerfilUsuario} from "../../domain/repository/iUsuarioRepository.js";
import {INuevoUsuarioDto} from "../../domain/dto/iNuevoUsuarioDto.js";
import {UsuarioModel} from "../model/usuarioModel.js";
import {UsuarioRolModel} from "../model/usuarioRolModel.js";
import {RolModel} from "../model/rolModel.js";
import {sequelize} from "../../../../shared/infrastructure/config/sequelize.js";

const camposPerfil: (keyof PerfilUsuario)[] = [
    "cusuario", "nombres", "apellidos", "correo", "telefono"
];

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
            nombres: usuario.nombres ?? "",
            apellidos: usuario.apellidos ?? "",
            correo: usuario.correo ?? "",
            passwordHash: usuario.password ?? "",
            activo: Number(usuario.activo) === 1,
            roles: roles.map((rol) => ({
                crol: Number(rol.crol),
                nombre: rol.nombre ?? ""
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


    private mapearPerfil(usuario: UsuarioModel): PerfilUsuario {
        return {
            cusuario: usuario.cusuario,
            nombres: usuario.nombres ?? "",
            apellidos: usuario.apellidos ?? "",
            correo: usuario.correo ?? "",
            telefono: usuario.telefono ?? null
        };
    }

    async buscarPerfil(cusuario: string): Promise<PerfilUsuario | null> {
        const usuario = await UsuarioModel.findOne({
            attributes: camposPerfil,
            where: { cusuario, activo: 1 }
        });

        return usuario ? this.mapearPerfil(usuario) : null;
    }

    async actualizarPerfil(
        cusuario: string,
        nombres: string,
        apellidos: string,
        telefono?: string | null
    ): Promise<PerfilUsuario | null> {
        const cambios: {
            nombres: string;
            apellidos: string;
            telefono?: string | null;
        } = {
            nombres: nombres.trim(),
            apellidos: apellidos.trim()
        };

        if (telefono !== undefined) {
            cambios.telefono = telefono?.trim() || null;
        }

        const [, usuarios] = await UsuarioModel.update(cambios, {
            where: { cusuario, activo: 1 },
            returning: camposPerfil
        });

        const usuario = usuarios[0];
        return usuario ? this.mapearPerfil(usuario) : null;
    }
}