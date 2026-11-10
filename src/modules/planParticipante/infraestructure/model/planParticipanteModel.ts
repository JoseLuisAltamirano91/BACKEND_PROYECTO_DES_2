
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {PlanModel} from "../../../plan/infraestructure/model/planModel";
import {UsuarioModel} from "../../../usuario/infrastructure/model/usuarioModel";

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
            references: { model: PlanModel, key: "cplan" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
            get() {
                const valor:any = this.getDataValue("cplan");
                return valor == null ? valor : Number(valor);
            }
        },
        cusuario: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        estado: { type: DataTypes.STRING(20), allowNull: false },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "PlanParticipante",
        tableName: "PLANPARTICIPANTE",
        schema: "public",
        timestamps: false
    }
);
