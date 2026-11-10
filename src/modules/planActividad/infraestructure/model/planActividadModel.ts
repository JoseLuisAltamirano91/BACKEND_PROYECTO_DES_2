
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class PlanActividadModel extends Model {
    declare cplanactividad: number;
    declare cplan: number;
    declare cactividad: string;
    declare orden: number | null;
    declare fechainicio: Date | null;
    declare fechafin: Date | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

PlanActividadModel.init(
    {
        cplanactividad: {
            type: DataTypes.DECIMAL(10, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor:any = this.getDataValue("cplanactividad");
                return valor == null ? valor : Number(valor);
            }
        },
        cplan: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
            get() {
                const valor:any = this.getDataValue("cplan");
                return valor == null ? valor : Number(valor);
            }
        },
        cactividad: { type: DataTypes.STRING(50), allowNull: false },
        orden: { type: DataTypes.DECIMAL(3, 0), allowNull: true },
        fechainicio: { type: DataTypes.DATE, allowNull: true },
        fechafin: { type: DataTypes.DATE, allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        tableName: "planactividad",
        timestamps: false
    }
);
