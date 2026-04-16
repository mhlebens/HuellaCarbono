const mongoose = require("mongoose");

// // 10. Colección Recomendaciones (Sugerencias dinámicas)
// db.Recomendaciones.insertOne({
//   id_recomendacion: 1,
//   tipo: "Ahorro Energético",
//   texto: "Cambia tus bombillas a LED para reducir un 80% el consumo de iluminación.",
//   impacto_estimado: "Bajo"
// });

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
