const mongoose = require("mongoose");

const tipoTransporteSchema = new mongoose.Schema(
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
    factorEmisionCO2: {
      type: Number,
      required: true,
      min: 0
    },
    unidad: {
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

module.exports = mongoose.model("TipoTransporte", tipoTransporteSchema);