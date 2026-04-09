const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  
  },
  duracion: {
    type: Number,
    required: true,
    min: 1
  
  },
  nivel: {
    type: String,
    required: true,
    enum: ["Basico", "Intermedio", "Avanzado"]
  },
  estado: {
    type: String,
    required: true,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Curso", cursoSchema);