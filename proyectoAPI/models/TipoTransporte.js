const mongoose = require("mongoose");

const tipoTransporteSchema = new mongoose.Schema(
  {
    id_transporte: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    factor_emision: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: "TiposTransporte",
  },
);

module.exports = mongoose.model("TipoTransporte", tipoTransporteSchema);
