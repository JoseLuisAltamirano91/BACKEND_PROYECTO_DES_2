
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../shared/infrastructure/config/sequelize.js";
import {UsuarioModel} from "../../../usuario/infrastructure/model/usuarioModel.js";

export class FavoritoModel extends Model {
    declare cfavorito: number;
    declare cusuario: string;
    declare tipo: string;
    declare creferencia: string | null;
    declare fingreso: Date | null;
    declare fmodificacion: Date | null;
    declare cusuarioing: string | null;
    declare cusuariomod: string | null;
}

FavoritoModel.init(
    {
        cfavorito: {
            type: DataTypes.DECIMAL(10, 0),
            primaryKey: true,
            allowNull: false,
            get() {
                const valor:any = this.getDataValue("cfavorito");
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
        tipo: { type: DataTypes.STRING(50), allowNull: false },
        creferencia: { type: DataTypes.STRING(50), allowNull: true },
        fingreso: { type: DataTypes.DATE, allowNull: true },
        fmodificacion: { type: DataTypes.DATE, allowNull: true },
        cusuarioing: { type: DataTypes.STRING(50), allowNull: true },
        cusuariomod: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
        sequelize,
        modelName: "Favorito",
        tableName: "FAVORITO",
        schema: "public",
        timestamps: false,
        indexes: [
            {
                name: "UKFAVORITO",
                unique: true,
                fields: ["cusuario", "tipo", "creferencia"]
            }
        ]
    }
);
