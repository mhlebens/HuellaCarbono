const mongoose = require("mongoose");

const consumoEnergiaSchema = new mongoose.Schema(
  {
    nombreFuente: {
      type: String,
      required: true,
      trim: true
    },
    categoria: {
      type: String,
      required: true,
      trim: true
    },
    factorEmisionCO2: {
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

module.exports = mongoose.model("ConsumoEnergia", consumoEnergiaSchema);