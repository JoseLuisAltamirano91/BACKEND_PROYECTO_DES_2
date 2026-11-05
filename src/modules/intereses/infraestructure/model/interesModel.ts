import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";

export class InteresModel extends Model {
    declare cinteres: number;
    declare nombre: string;
    declare descripcion: string | null;
    declare activo: boolean;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

InteresModel.init(
    {
        cinteres: {
            type: DataTypes.DECIMAL(5, 0),
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        activo: {
            type: DataTypes.DECIMAL(1, 0),
            allowNull: true,
            get() {
                const valor: number | null = this.getDataValue("activo");
                return valor === null ? false : Number(valor) === 1;
            },
            set(valor: boolean) {
                this.setDataValue("activo", Number(valor));
            }
        },
        fingreso: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fmodificacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cusuarioing: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        cusuariomod: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "Interes",
        tableName: "interes",
        schema: "public",
        timestamps: false
    }
);