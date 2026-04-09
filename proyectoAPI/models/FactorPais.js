const mongoose = require("mongoose");

const factorPaisSchema = new mongoose.Schema(
  {
    pais: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    factorElectricidad: {
      type: Number,
      required: true,
      min: 0
    },
    factorTransporte: {
      type: Number,
      required: true,
      min: 0
    },
    factorAlimentacion: {
      type: Number,
      required: true,
      min: 0
    },
    monedaLocal: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FactorPais", factorPaisSchema);