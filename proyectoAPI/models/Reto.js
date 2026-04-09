const mongoose = require("mongoose");

const retoSchema = new mongoose.Schema(
  {
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
    categoriaRetoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoriaReto",
      required: true
    },
    duracionDias: {
      type: Number,
      required: true,
      min: 1
    },
    dificultad: {
      type: String,
      required: true,
      enum: ["Facil", "Media", "Dificil"]
    },
    puntosRecompensa: {
      type: Number,
      default: 0,
      min: 0
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reto", retoSchema);