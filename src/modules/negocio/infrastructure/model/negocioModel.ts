
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {UsuarioModel} from "../../../usuario/infrastructure/model/usuarioModel.js";

export class NegocioModel extends Model {
    declare cnegocio: number;
    declare cusuario: string;
    declare nombre: string | null;
    declare descripcion: string | null;
    declare telefono: string | null;
    declare correo: string | null;
    declare activo: string | null;
    declare fcreacion: string | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

NegocioModel.init(
    {
        cnegocio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cusuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        nombre: { type: DataTypes.STRING(100), allowNull: true },
        descripcion: { type: DataTypes.STRING(150), allowNull: true },
        telefono: { type: DataTypes.STRING(25), allowNull: true },
        correo: { type: DataTypes.STRING(100), allowNull: true },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fcreacion: { type: DataTypes.DECIMAL(8, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Negocio",
        tableName: "NEGOCIO",
        schema: "public",
        timestamps: false
    }
);
