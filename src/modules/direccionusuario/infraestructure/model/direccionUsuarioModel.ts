import { DataTypes, Model, Sequelize } from "sequelize";

export class DireccionUsuarioModel extends Model {
    declare cdireccion: number;
    declare cusuario: string;
    declare pais: number | null;
    declare provincia: number | null;
    declare canton: number | null;
    declare ciudad: number | null;
    declare parroquia: number | null;
    declare sector: number | null;
    declare direccion: string | null;
    declare principal: boolean | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

export function initDireccionUsuarioModel(sequelize: Sequelize) {
    DireccionUsuarioModel.init(
        {
            cdireccion: {
                type: DataTypes.DECIMAL(5, 0),
                primaryKey: true,
                allowNull: false
            },
            cusuario: {
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false
            },
            pais: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            provincia: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            canton: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            ciudad: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            parroquia: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            sector: { type: DataTypes.DECIMAL(5, 0), allowNull: true },
            direccion: { type: DataTypes.STRING(500), allowNull: true },
            principal: {
                type: DataTypes.DECIMAL(1, 0),
                allowNull: true,
                get() {
                    const valor: number | null = this.getDataValue("principal");
                    return valor === null ? null : Number(valor) === 1;
                },
                set(valor: boolean | null) {
                    this.setDataValue("principal", valor === null ? null : Number(valor));
                }
            },
            fingreso: { type: DataTypes.DATE, allowNull: true },
            fmodificacion: { type: DataTypes.DATE, allowNull: true },
            cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
            cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
        },
        {
            sequelize,
            tableName: "direccionusuario",
            timestamps: false
        }
    );
}