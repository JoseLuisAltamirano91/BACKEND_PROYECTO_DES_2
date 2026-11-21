import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import { UsuarioModel } from "../../../usuario/infrastructure/model/usuarioModel.js";

export class PlanModel extends Model {
    declare cplan: number;
    declare cusuario: string;
    declare cinteres: number | null;
    declare cnegocio: number | null;
    declare nombre: string | null;
    declare descripcion: string | null;
    declare fechainicio: Date | null;
    declare fechafin: Date | null;
    declare costoestimado: string | null;
    declare latitud: string | null;
    declare longitud: string | null;
    declare lugar: string | null;
    declare tipoplan: string | null;
    declare estado: string | null;
    declare publico: number | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

PlanModel.init(
    {
        cplan: {
            type: DataTypes.DECIMAL(10, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor: any = this.getDataValue("cplan");
                return valor == null ? valor : Number(valor);
            }
        },
        cusuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: { model: UsuarioModel, key: "cusuario" },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        },
        cinteres: { type: DataTypes.DECIMAL(10, 0), allowNull: true },
        cnegocio: { type: DataTypes.INTEGER, allowNull: true },
        nombre: { type: DataTypes.STRING(150), allowNull: true },
        descripcion: { type: DataTypes.STRING(500), allowNull: true },
        fechainicio: { type: DataTypes.DATE, allowNull: true },
        fechafin: { type: DataTypes.DATE, allowNull: true },
        costoestimado: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        latitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
        longitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
        lugar: { type: DataTypes.STRING(250), allowNull: true },
        tipoplan: { type: DataTypes.STRING(20), allowNull: true },
        estado: { type: DataTypes.STRING(20), allowNull: true },
        publico: { type: DataTypes.DECIMAL(1, 0), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Plan",
        tableName: "PLAN",
        schema: "public",
        timestamps: false
    }
);

PlanModel.belongsTo(UsuarioModel, {
    foreignKey: "cusuario",
    targetKey: "cusuario",
    as: "usuario"
});