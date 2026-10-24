import express from "express";
import cors from "cors";
import {negocioRoutes} from "../../modules/negocio/infrastructure/negocioRoutes.js";
import {authRoutes} from "../../modules/usuario/infrastructure/authRoutes.js";

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

export default app;