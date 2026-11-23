import { DataTypes, Model, type Transaction } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import { NegocioModel } from "../../../negocio/infrastructure/model/negocioModel.js";

export class SucursalModel extends Model {
    declare csucursal: number;
    declare cnegocio: number;
    declare nombre: string;
    declare direccion: string;
    declare telefono: string | null;
    declare latitud: string | null;
    declare longitud: string | null;
    declare activo: string;
    declare fingreso: Date;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

SucursalModel.init(
    {
        csucursal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        cnegocio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: NegocioModel, key: "cnegocio" },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT"
        },
        nombre: { type: DataTypes.STRING(100), allowNull: false },
        direccion: { type: DataTypes.STRING(500), allowNull: false },
        telefono: { type: DataTypes.STRING(25), allowNull: true },
        latitud: { type: DataTypes.DECIMAL(9, 6), allowNull: true },
        longitud: { type: DataTypes.DECIMAL(9, 6), allowNull: true },
        activo: { type: DataTypes.DECIMAL(1, 0), allowNull: false, defaultValue: 1 },
        fingreso: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal("CURRENT_TIMESTAMP") },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Sucursal",
        tableName: "SUCURSAL",
        schema: "public",
        timestamps: false,
        hooks: {
            // Conserva las reglas de la tabla al regenerarla con sync().
            async afterSync(options) {
                const { transaction } = options as { transaction?: Transaction };
                await sequelize.query(`
                    DO $$
                    BEGIN
                        IF NOT EXISTS (
                            SELECT 1 FROM pg_constraint
                            WHERE conrelid = 'public."SUCURSAL"'::regclass AND conname = 'ck_sucursal_datos'
                        ) THEN
                            ALTER TABLE public."SUCURSAL" ADD CONSTRAINT ck_sucursal_datos CHECK (
                                btrim(nombre) <> '' AND btrim(direccion) <> ''
                                AND activo IN (0, 1)
                                AND ((latitud IS NULL) = (longitud IS NULL))
                                AND latitud BETWEEN -90 AND 90
                                AND longitud BETWEEN -180 AND 180
                            );
                        END IF;
                    END;
                    $$;
                `, { transaction });
            }
        }
    }
);

SucursalModel.belongsTo(NegocioModel, {
    foreignKey: "cnegocio",
    targetKey: "cnegocio",
    as: "negocio"
});
