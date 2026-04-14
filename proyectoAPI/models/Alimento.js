const mongoose = require("mongoose");

const alimentoSchema = new mongoose.Schema(
  {
    id_alimento: {
      type: Number,
      required: true
    },
    categoria: {
      type: String,
      required: true,
      trim: true
    },
    impacto_alto: {
      type: Boolean,
      required: true
    },
    co2_por_kg: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: false,
    collection: "Alimentos"
  }
);

module.exports = mongoose.model("Alimento", alimentoSchema);