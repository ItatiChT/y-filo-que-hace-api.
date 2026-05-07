import mongoose from "mongoose";
// Función asincrónica para establecer la conexión con MongoDB
export const connectDB = async () => {
  try {
    // Intentamos la conexión usando la URI guardada en las variables de entorno
    // Esto mantiene las credenciales de la base de datos seguras y fuera del códigoB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB conectada");
  } catch (error) {
    // Si hay un error (ej: internet caído, URI mal escrita), lo informamos
    console.error(error);
    console.error(error);
    //  Si no hay base de datos, la app no debe seguir corriendo.
    // process.exit(1) detiene el proceso de Node.js con un código de error.
    process.exit(1);
  }
};