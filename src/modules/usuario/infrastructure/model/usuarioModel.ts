import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class UsuarioModel extends Model {
    declare cusuario: string;
    declare nombres: string | null;
    declare apellidos: string | null;
    declare correo: string | null;
    declare telefono: string | null;
    declare fnacimiento: string | null;
    declare password: string | null;
    declare activo: string | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

UsuarioModel.init(
    {
        cusuario: { type: DataTypes.STRING(50), primaryKey: true, allowNull: false },
        nombres: { type: DataTypes.STRING(100), allowNull: true },
        apellidos: { type: DataTypes.STRING(100), allowNull: true },
        correo: { type: DataTypes.STRING(150), allowNull: true },
        telefono: { type: DataTypes.STRING(25), allowNull: true },
        fnacimiento: { type: DataTypes.DECIMAL(8, 0), allowNull: true },
        password: { type: DataTypes.STRING(255), allowNull: true },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Usuario",
        tableName: "USUARIO",
        schema: "public",
        timestamps: false
    }
);