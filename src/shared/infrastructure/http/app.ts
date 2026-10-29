import express from "express";
import cors from "cors";
import {authRoutes} from "../../../modules/usuario/infrastructure/authRoutes.js";
import {negocioRoutes} from "../../../modules/negocio/infrastructure/negocioRoutes.js";
import {direccionUsuarioRoutes} from "../../../modules/direccionusuario/infraestructure/direccionUsuarioRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        mensaje: "PlaningGo funcionando"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/negocios", negocioRoutes);
app.use("/api/direcciones", direccionUsuarioRoutes);

export default app;