import "dotenv/config";
import { Sequelize } from "sequelize";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER || DB_PASSWORD === undefined) {
    throw new Error("Faltan DB_NAME, DB_USER o DB_PASSWORD en .env");
}

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST ?? "localhost",
        port: Number(DB_PORT ?? 5432),
        dialect: "postgres",
        logging: false
    }
);

export async function verificarConexion(): Promise<void> {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado mediante Sequelize");
}