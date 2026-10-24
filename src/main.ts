import "dotenv/config";
import { sequelize } from "./shared/infrastructure/config/sequelize.js";
import app from "./shared/infrastructure/http/app.js";

const port = Number(process.env.PORT ?? 3977);

async function iniciar(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL conectado mediante Sequelize");

        app.listen(port, () => {
            console.log(`PlaningGo iniciado en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar PlaningGo:", error);
        await sequelize.close();
        process.exitCode = 1;
    }
}

iniciar();