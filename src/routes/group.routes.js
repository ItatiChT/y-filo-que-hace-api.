import { Router } from "express";
import { createGroup, getGroups, updateGroup, deleteGroup } from "../controllers/group.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta publica: Permite listar los grupos (por ejemplo, para la página de inicio)
router.get("/", getGroups);
// Rutas protegidas: Solo usuarios logueados pueden:
//crear un nuevo grupo de investigación
router.post("/", verifyToken, createGroup);
//modificar o actualizar los grupos
router.put("/:id", verifyToken, updateGroup);
//eliminar un grupo
router.delete("/:id", verifyToken, deleteGroup);
export default router;
