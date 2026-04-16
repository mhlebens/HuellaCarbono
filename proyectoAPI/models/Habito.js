const mongoose = require("mongoose");

// // 5. Colección Habitos (Definiciones de hábitos a seguir)
// db.Habitos.insertOne({
//   id_habito: 1,
//   descripcion: "Usar bicicleta para ir al trabajo",
//   categoria: "Transporte",
//   puntos_eco: 50
// });

const habitoSchema = new mongoose.Schema(
  {
    id_habito: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    puntos_eco: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "Habitos",
  },
);

module.exports = mongoose.model("Habito", habitoSchema);
