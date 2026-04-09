const mongoose = require("mongoose");

const retoSchema = new mongoose.Schema(
  {
    id_reto: {
      type: Number,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    duracion_dias: {
      type: Number,
      required: true,
      min: 1,
    },
    dificultad: {
      type: String,
      required: true,
      enum: ["Fácil", "Media", "Difícil"],
    },
  },
  {
    timestamps: true,
    collection: "Retos",
  },
);

module.exports = mongoose.model("Reto", retoSchema);
