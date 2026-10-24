import { DataTypes, Model } from "sequelize";
import {sequelize} from "../../../infrastructure/config/sequelize.js";

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
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100)
        },
        descripcion: {
            type: DataTypes.STRING(150)
        },
        telefono: {
            type: DataTypes.STRING(25)
        },
        correo: {
            type: DataTypes.STRING(100)
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0)
        },
        fcreacion: {
            type: DataTypes.DECIMAL(8, 0)
        },
        fingreso: {
            type: DataTypes.DATE
        },
        fmodificacion: {
            type: DataTypes.DATE
        },
        cusuarioing: {
            type: DataTypes.STRING(50)
        },
        cusuariomod: {
            type: DataTypes.STRING(50)
        }
    },
    {
        sequelize,
        modelName: "Negocio",
        tableName: "negocio",
        schema: "public",
        timestamps: false
    }
);