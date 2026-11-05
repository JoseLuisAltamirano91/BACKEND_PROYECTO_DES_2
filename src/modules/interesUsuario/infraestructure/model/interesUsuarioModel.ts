import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class InteresUsuarioModel extends Model {
    declare cusuario: string;
    declare cinteres: number;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

InteresUsuarioModel.init(
    {
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        cinteres: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false
        },
        fingreso: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fmodificacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cusuarioing: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        cusuariomod: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "InteresUsuario",
        tableName: "usuariointeres",
        schema: "public",
        timestamps: false
    }
);