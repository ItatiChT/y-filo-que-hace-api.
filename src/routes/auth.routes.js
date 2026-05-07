import { Router } from "express";
// Importación de los controladores que manejan la lógica de identidad
import { register, login, getProfile } from "../controllers/auth.controller.js"; 
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
// Ruta de registro: Pública, permite crear nuevos usuarios en la base de datos
router.post("/register", register);
// Ruta de login Pública, intercambia credenciales por un token JWT
router.post("/login", login);

// Ruta de perfil: Protegida. 
// Solo un usuario con un token válido puede pedir sus propios datos.
// 'verifyToken' extrae el ID del token y se lo pasa a 'getProfile'.
router.get("/profile", verifyToken, getProfile);

export default router;