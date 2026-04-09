const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombreCompleto: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    pais: {
      type: String,
      required: true,
      trim: true
    },
    nivelConcienciaEcologica: {
      type: String,
      required: true,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  {
    timestamps: true
  }
);
  
module.exports = mongoose.model("Usuario", UsuarioSchemaSchema);