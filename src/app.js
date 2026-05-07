import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Importación de los módulos de rutas (Modularización)
import groupRoutes from "./routes/group.routes.js";
import authRoutes from "./routes/auth.routes.js";
import aporteRoutes from "./routes/aporte.routes.js"; // 👈 FALTA ESTO

const app = express();

// Middlewares globales

// CORS: Permite que el frontend (que puede estar en otro dominio/puerto) 
// se comunique con este backend sin bloqueos de seguridad del navegador.
app.use(cors());
// Body Parser: Permite que Express entienda los datos q
app.use(express.json());

// SEGURIDAD: Rate Limit
// limiter SOLO para auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo: 15 minutos
  max: 20, // Máximo de 20 peticiones por ventana
  message: "Demasiados intentos de login, intentá más tarde"
});

app.use("/auth", authLimiter);

// Registro de rutas
// Definimos los prefijos para cada sección de la API
app.use("/groups", groupRoutes);
app.use("/auth", authRoutes);
app.use("/aportes", aporteRoutes); //  Y ESTO

export default app;