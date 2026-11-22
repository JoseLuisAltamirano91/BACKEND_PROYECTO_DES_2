
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
    private readonly cliente: GoogleGenAI;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("No se configuró GEMINI_API_KEY en el archivo .env");
        }

        this.cliente = new GoogleGenAI({ apiKey });
    }

    async generarRespuesta(consulta: string): Promise<string> {
        if (!consulta.trim()) {
            throw new Error("Debes ingresar una consulta");
        }

        const respuesta = await this.cliente.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: consulta,
            config: {
                temperature: 0.3
            }
        });

        return respuesta.text ?? "";
    }
}
