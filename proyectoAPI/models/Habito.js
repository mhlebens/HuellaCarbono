const mongoose = require("mongoose");

const habitoSchema = new mongoose.Schema(
  {
    nombre: {
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
    puntosEco: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Habito", habitoSchema);