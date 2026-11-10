
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {UsuarioModel} from "../../../usuario/infrastructure/model/usuarioModel.js";

export class PreferenciaUsuarioModel extends Model {
    declare cpreferencia: number;
    declare cusuario: string;
    declare presupuestomax: number | null;
    declare distanciamax: number | null;
    declare tipocompania: string | null;
    declare activo: boolean | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

PreferenciaUsuarioModel.init(
    {
        cpreferencia: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false
        },
        cusuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: "AK_UKPREFERENCIAUSUAR_PREFEREN",
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        presupuestomax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        distanciamax: {
            type: DataTypes.DECIMAL(5, 0),
            allowNull: true
        },
        tipocompania: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0),
            allowNull: true,
            get() {
                const valor = this.getDataValue("activo");
                return valor == null ? null : Number(valor) === 1;
            },
            set(valor: boolean | null) {
                this.setDataValue(
                    "activo",
                    valor === null ? null : Number(valor)
                );
            }
        },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "PreferenciaUsuario",
        tableName: "PREFERENCIAUSUARIO",
        schema: "public",
        timestamps: false
    }
);
