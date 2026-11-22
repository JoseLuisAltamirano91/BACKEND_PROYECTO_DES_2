
import "dotenv/config";
import { GeminiService } from "./modules/recomendacionIA/infrastructure/service/GeminiService.js";

async function probarGemini() {
    try {
        const gemini = new GeminiService();

        const respuesta = await gemini.generarRespuesta(
            "Recomiéndame una actividad de ciclismo para un domingo en Quito. Responde brevemente."
        );

        console.log("Respuesta de Gemini:");
        console.log(respuesta);
    } catch (error) {
        console.error("Error al consultar Gemini:", error);
    }
}

void probarGemini();
