const mongoose = require("mongoose");

const recomendacionSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    categoria: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    nivelImpacto: {
      type: String,
      required: true,
      enum: ["Bajo", "Medio", "Alto"]
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recomendacion", recomendacionSchema);