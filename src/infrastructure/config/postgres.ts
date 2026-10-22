import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 5000
});

pool.on("error", (error) => {
    console.error("Error de conexión PostgreSQL:", error.message);
});

export async function verificarConexion(): Promise<void> {
    await pool.query("SELECT 1");
    console.log("PostgreSQL conectado correctamente");
}