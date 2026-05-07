import dotenv from "dotenv";
dotenv.config(); // Carga las variables del archivo .env al objeto process.env

import app from "./app.js"; // Importa la configuración de Express
import { connectDB } from "./config/db.js";

//Definición del puerto: usa el del entorno (útil para despliegue/hosting) 
// o el 3000 por defecto para desarrollo local.
const PORT = process.env.PORT || 3000;

// Ejecuta la conexión a MongoDB
connectDB();

// Pone al servidor a "escuchar" peticiones entrantes
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});