import "dotenv/config";
import app from "./infrastructure/http/app.js";
import {
    sequelize,
    verificarConexion
} from "./infrastructure/config/sequelize.js";

const port = Number(process.env.PORT ?? 3977);

async function iniciar(): Promise<void> {
    try {
        await verificarConexion();

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