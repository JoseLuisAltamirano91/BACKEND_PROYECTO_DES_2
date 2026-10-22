import { Op, fn, col, where } from "sequelize";
import type { IUsuario } from "../../../domain/models/iUsuario.js";
import type { IUsuarioRepository } from "../../../application/ports/iUsuarioRepository.js";
import { UsuarioModel } from "./models/usuarioModel.js";
import { RolModel } from "./models/rolModel.js";
import { UsuarioRolModel } from "./models/usuarioRolModel.js";

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
}