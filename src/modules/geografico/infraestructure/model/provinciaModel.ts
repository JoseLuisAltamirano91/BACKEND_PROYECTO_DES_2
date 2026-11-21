import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import { PaisModel } from "./paisModel.js";

export class ProvinciaModel extends Model {
    declare cpais: number;
    declare cprovincia: number;
    declare nombre: string;
    declare activo: number;
}

ProvinciaModel.init(
    {
        cpais: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false,
            references: { model: PaisModel, key: "cpais" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
            get() {
                const valor: any = this.getDataValue("cpais");
                return valor == null ? valor : Number(valor);
            }
        },
        cprovincia: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor: any = this.getDataValue("cprovincia");
                return valor == null ? valor : Number(valor);
            }
        },
        nombre: { type: DataTypes.STRING(100), allowNull: false },
        activo: {
            type: DataTypes.DECIMAL(1, 0),
            allowNull: false,
            defaultValue: 1,
            get() {
                const valor: any = this.getDataValue("activo");
                return valor == null ? valor : Number(valor);
            }
        }
    },
    {
        sequelize,
        modelName: "Provincia",
        tableName: "PROVINCIA",
        schema: "public",
        timestamps: false
    }
);