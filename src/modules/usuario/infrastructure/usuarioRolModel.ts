import { DataTypes, Model } from "sequelize";
import {sequelize} from "../../../shared/infrastructure/config/sequelize.js";

export class UsuarioRolModel extends Model {
    declare cusuario: string;
    declare crol: string;
    declare activo: string | null;
}

UsuarioRolModel.init(
    {
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        crol: {
            type: DataTypes.DECIMAL(4, 0),
            primaryKey: true,
            allowNull: false
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0)
        }
    },
    {
        sequelize,
        modelName: "UsuarioRol",
        tableName: "usuariorol",
        schema: "public",
        timestamps: false
    }
);