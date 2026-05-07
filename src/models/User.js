import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: String,
  // El email es el identificador único para el login
  email: { type: String, 
    unique: true }, // Evita que se registren dos personas con el mismo correo
  password: String, // Acá se guarda la contraseña
  //Relación opcional: permite vincular al usuario con un grupo específico.
  grupoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group" // Referencia al modelo de Grupos
  }
}, { timestamps: true }); // Crea automáticamente campos de fecha de creación y edición

export default mongoose.model("User", userSchema);