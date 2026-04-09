const mongoose = require("mongoose");

const calculoCO2Schema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    periodo: {
      type: String,
      required: true,
      trim: true
    },
    totalCO2: {
      type: Number,
      required: true,
      min: 0
    },
    categoriaMayorImpacto: {
      type: String,
      trim: true
    },
    recomendacionesGeneradas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recomendacion"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("CalculoCO2", calculoCO2Schema);