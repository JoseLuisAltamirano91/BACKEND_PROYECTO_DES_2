
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class PlanParticipanteModel extends Model {
    declare cplan: number;
    declare cusuario: string;
    declare estado: string;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

PlanParticipanteModel.init(
    {
        cplan: {
            type: DataTypes.DECIMAL(10, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor:any = this.getDataValue("cplan");
                return valor == null ? valor : Number(valor);
            }
        },
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        estado: { type: DataTypes.STRING(20), allowNull: false },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        tableName: "planparticipante",
        timestamps: false
    }
);
