import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/sequelize.js";

export class RolModel extends Model {
    declare crol: string;
    declare nombre: string;
    declare activo: string | null;
}

RolModel.init(
    {
        crol: {
            type: DataTypes.DECIMAL(4, 0),
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50)
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0)
        }
    },
    {
        sequelize,
        modelName: "Rol",
        tableName: "rol",
        schema: "public",
        timestamps: false
    }
);