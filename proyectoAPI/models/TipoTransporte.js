const mongoose = require("mongoose");

// // 2. Colección TiposTransporte (Colección maestra para opciones)
// db.TiposTransporte.insertOne({
//   id_transporte: 1,
//   nombre: "Automóvil Eléctrico",
//   factor_emision: 0.05 // kg CO2 por km
// });

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
