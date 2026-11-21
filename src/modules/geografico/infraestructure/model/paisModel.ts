import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class PaisModel extends Model {
    declare cpais: number;
    declare nombre: string;
    declare activo: number;
}

PaisModel.init(
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
        nombre: { type: DataTypes.STRING(100), allowNull: false },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: false, defaultValue: 1 }
    },
    {
        sequelize,
        modelName: "Pais",
        tableName: "PAIS",
        schema: "public",
        timestamps: false
    }
);