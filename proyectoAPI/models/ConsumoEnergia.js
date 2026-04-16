const mongoose = require("mongoose");

// // 4. Colección ConsumoEnergia (Fuentes de energía hogar)
// db.ConsumoEnergia.insertOne({
//   id_energia: 1,
//   tipo: "Electricidad Red Pública",
//   unidad: "kWh",
//   factor: 0.45
// });

const consumoEnergiaSchema = new mongoose.Schema(
  {
    // Mapeado de 'id_energia'
    id_energia: {
      type: Number,
      required: true,
      unique: true, // Asumiendo que es un identificador único
    },
    // Mapeado de 'tipo' (antes nombreFuente/categoria)
    tipo: {
      type: String,
      required: true,
      trim: true,
    },
    // Mapeado de 'unidad' (antes unidadMedida)
    unidad: {
      type: String,
      required: true,
      trim: true,
    },
    // Mapeado de 'factor' (antes factorEmisionCO2)
    factor: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    // Importante: forzar el nombre de la colección si MongoDB la creó en plural o exacto
    collection: "ConsumoEnergia",
  },
);

module.exports = mongoose.model("ConsumoEnergia", consumoEnergiaSchema);
