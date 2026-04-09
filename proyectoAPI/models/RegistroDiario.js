const mongoose = require("mongoose");

const actividadesSchema = new mongoose.Schema(
  {
    km_recorridos: {
      type: Number,
      min: 0,
      default: 0,
    },
    tipo_transporte: {
      type: String,
      trim: true,
    },
    ducha_minutos: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { _id: false },
);

const registroDiarioSchema = new mongoose.Schema(
  {
    id_registro: {
      type: Number,
      required: true,
    },
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    actividades: {
      type: actividadesSchema,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: "RegistrosDiarios",
  },
);

module.exports = mongoose.model("RegistroDiario", registroDiarioSchema);
