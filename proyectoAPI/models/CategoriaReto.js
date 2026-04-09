const mongoose = require("mongoose");

const categoriaRetoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoriaReto", categoriaRetoSchema);