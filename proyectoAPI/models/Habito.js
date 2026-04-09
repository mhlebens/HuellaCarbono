const mongoose = require("mongoose");

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
