const mongoose = require("mongoose");

// // 3. Colección Alimentos (Catálogo de impacto por tipo de dieta)
// db.Alimentos.insertOne({
//   id_alimento: 1,
//   categoria: "Carne de Res",
//   impacto_alto: true,
//   co2_por_kg: 27.0
// });


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