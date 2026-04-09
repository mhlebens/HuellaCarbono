const mongoose = require("mongoose");

const alimentoSchema = new mongoose.Schema(
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
    huellaCO2Kg: {
      type: Number,
      required: true,
      min: 0
    },
    unidadMedida: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alimento", alimentoSchema);