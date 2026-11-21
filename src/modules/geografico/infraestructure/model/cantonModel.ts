import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class CantonModel extends Model {
    declare cpais: number;
    declare cprovincia: number;
    declare ccanton: number;
    declare nombre: string;
    declare activo: number;
}

CantonModel.init(
    {
        cpais: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false,
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
        ccanton: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor: any = this.getDataValue("ccanton");
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
        modelName: "Canton",
        tableName: "CANTON",
        schema: "public",
        timestamps: false
    }
);