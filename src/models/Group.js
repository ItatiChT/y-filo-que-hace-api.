import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  nombre: String,
  carrera: String, // Para filtrar por Antropología, Filosofía, etc.
  director: String,
  miembros: [String], // Array de strings para nombres de integrantes
  contacto: String,
  resumen: String, // Breve descripción del grupo de investigación
  icono: String,  // URL o string para la identidad visual. La ide futura es cada uno pueda personalizar su icono en el mapa central
  createdBy: {
    // Enlaza el grupo con el Usuario que lo creó 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);