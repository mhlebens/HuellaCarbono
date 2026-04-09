const mongoose = require("mongoose");

const recomendacionSchema = new mongoose.Schema(
  {
    id_recomendacion: {
      type: Number,
      required: true,
      unique: true,
    },
    tipo: {
      type: String,
      required: true,
      trim: true,
    },
    texto: {
      type: String,
      required: true,
      trim: true,
    },
    impacto_estimado: {
      type: String,
      required: true,
      enum: ["Bajo", "Medio", "Alto"],
    },
  },
  {
    timestamps: true,
    collection: "Recomendaciones",
  },
);

module.exports = mongoose.model("Recomendacion", recomendacionSchema);
