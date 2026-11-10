import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class RolModel extends Model {
    declare crol: string;
    declare nombre: string | null;
    declare descripcion: string | null;
    declare activo: string | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

RolModel.init(
    {
        crol: { type: DataTypes.DECIMAL(4, 0), primaryKey: true, allowNull: false },
        nombre: { type: DataTypes.STRING(50), allowNull: true },
        descripcion: { type: DataTypes.STRING(100), allowNull: true },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Rol",
        tableName: "ROL",
        schema: "public",
        timestamps: false
    }
);