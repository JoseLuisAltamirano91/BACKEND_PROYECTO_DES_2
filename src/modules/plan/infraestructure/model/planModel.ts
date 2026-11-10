
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class PlanModel extends Model {
    declare cplan: number;
    declare cusuario: string;
    declare nombre: string | null;
    declare descripcion: string | null;
    declare fechainicio: Date | null;
    declare fechafin: Date | null;
    declare estado: string | null;
    declare publico: number | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

PlanModel.init(
    {
        cplan: { type: DataTypes.DECIMAL(10, 0), primaryKey: true, allowNull: false,
            get() { const valor:number = this.getDataValue("cplan"); return valor == null ? valor : Number(valor); }
        },
        cusuario: { type: DataTypes.STRING(50), allowNull: false },
        nombre: { type: DataTypes.STRING(150), allowNull: true },
        descripcion: { type: DataTypes.STRING(500), allowNull: true },
        fechainicio: { type: DataTypes.DATE, allowNull: true },
        fechafin: { type: DataTypes.DATE, allowNull: true },
        estado: { type: DataTypes.STRING(20), allowNull: true },
        publico: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        tableName: "plan",
        timestamps: false
    }
);
