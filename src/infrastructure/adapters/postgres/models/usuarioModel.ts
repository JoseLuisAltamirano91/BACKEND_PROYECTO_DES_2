import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/sequelize.js";

export class UsuarioModel extends Model {
    declare cusuario: string;
    declare nombres: string;
    declare apellidos: string;
    declare correo: string;
    declare password: string;
    declare activo: string | null;
}

UsuarioModel.init(
    {
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        nombres: {
            type: DataTypes.STRING(100)
        },
        apellidos: {
            type: DataTypes.STRING(100)
        },
        correo: {
            type: DataTypes.STRING(150)
        },
        password: {
            type: DataTypes.STRING(255)
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0)
        }
    },
    {
        sequelize,
        modelName: "Usuario",
        tableName: "usuario",
        schema: "public",
        timestamps: false
    }
);