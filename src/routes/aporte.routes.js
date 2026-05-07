import { Router } from "express";
import { createAporte, getAportes, updateAporte, deleteAporte } from "../controllers/aporte.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"; // Importa el middleware

const router = Router();

// Ruta publica: Cualquiera puede ver los aportes
router.get("/", getAportes);
// Rutas protegidas: Requieren que el usuario envíe un token válido en el header
// El middleware 'verifyToken' se ejecuta antes que el controlador
router.post("/", verifyToken, createAporte); //para subir un nuevo aporte
router.put("/:id", verifyToken, updateAporte);    // Para editar, parámetro de ruta :id
router.delete("/:id", verifyToken, deleteAporte); // Para borrar, usa parámetro de ruta :id
export default router;



