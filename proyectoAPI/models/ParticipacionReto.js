const mongoose = require("mongoose");

const participacionRetoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    retoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reto",
      required: true
    },
    fechaInicio: {
      type: Date,
      required: true
    },
    fechaFin: {
      type: Date
    },
    estado: {
      type: String,
      enum: ["En progreso", "Completado", "Abandonado"],
      default: "En progreso"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParticipacionReto", participacionRetoSchema);