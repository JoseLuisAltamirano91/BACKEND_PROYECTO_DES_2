
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {UsuarioModel} from "./usuarioModel.js";
import {RolModel} from "./rolModel.js";

export class UsuarioRolModel extends Model {
    declare cusuario: string;
    declare crol: string;
    declare fasignacion: string | null;
    declare activo: string | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

UsuarioRolModel.init(
    {
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        crol: {
            type: DataTypes.DECIMAL(4, 0),
            primaryKey: true,
            allowNull: false,
            references: { model: RolModel, key: "crol" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        fasignacion: { type: DataTypes.DECIMAL(8, 0), allowNull: true },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "UsuarioRol",
        tableName: "USUARIOROL",
        schema: "public",
        timestamps: false
    }
);
