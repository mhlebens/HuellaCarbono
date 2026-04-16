const mongoose = require("mongoose");

// // 8. Colección Retos (Desafíos disponibles)
// db.Retos.insertOne({
//   id_reto: 1,
//   titulo: "Semana sin Plásticos",
//   duracion_dias: 7,
//   dificultad: "Media"
// });

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
