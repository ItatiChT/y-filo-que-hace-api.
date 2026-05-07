
import mongoose from "mongoose";

//Con Schema defino qué campos tendrá cada "Aporte" y qué tipo de dato debe ir en cada uno.
const aporteSchema = new mongoose.Schema({ 
  // Relación obligatoria: vincula el aporte con un grupo existente
  grupoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true // los aportes siempre se situan dentro de un grupo
  },

  titulo: { //Obligatorio
    type: String,
    required: true
  },

  descripcion: { //Obligatorio
    type: String,
    required: true
  },

  // Referencia al usuario que subió el aporte
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  link: String, // Opcional: para adjuntar material externo
  tipo: String, //Opcional: Para categorizar (ej: "PDF", "Evento", "Ensayo")
  palabrasClave: [String], // Para poder utilizar filtros de busqueda
  autores: [String], //Opcional: Nombres de los autores del trabajo u organizadores
  fecha: Date // Fecha específica del material
}, { timestamps: true }); // Genera createdAt y updatedAt automáticamente

export default mongoose.model("Aporte", aporteSchema);