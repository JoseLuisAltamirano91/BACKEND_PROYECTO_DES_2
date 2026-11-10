
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {UsuarioModel} from "../../../usuario/infrastructure/model/usuarioModel.js";
import {InteresModel} from "../../../intereses/infraestructure/model/interesModel.js";

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
            allowNull: false,
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        cinteres: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false,
            references: { model: InteresModel, key: "cinteres" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "InteresUsuario",
        tableName: "USUARIOINTERES",
        schema: "public",
        timestamps: false
    }
);
