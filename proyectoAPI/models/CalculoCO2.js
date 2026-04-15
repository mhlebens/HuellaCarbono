const mongoose = require("mongoose");

const calculoCO2Schema = new mongoose.Schema(
  {
    id_calculo: {
      type: Number,
      required: true
    },
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    mes: {
      type: String,
      required: true,
      trim: true
    },
    total_emisiones: {
      type: Number,
      required: true,
      min: 0
    },
    unidad: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: false,
    collection: "CalculosCO2"
  }
);

module.exports = mongoose.model("CalculoCO2", calculoCO2Schema);