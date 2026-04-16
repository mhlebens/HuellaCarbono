const mongoose = require("mongoose");

// // 12. Colección FactoresPaises (Factores de emisión específicos por país)
// db.FactoresPaises.insertOne({
//   id_pais: 1,
//   nombre_pais: "España",
//   factor_electricidad: 0.19,
//   moneda: "EUR"
// });

const factorPaisSchema = new mongoose.Schema(
  {
    // Mapeado de 'id_pais'
    id_pais: {
      type: Number,
      required: true,
      unique: true,
    },
    // Mapeado de 'nombre_pais'
    nombre_pais: {
      type: String,
      required: true,
      trim: true,
    },
    // Mapeado de 'factor_electricidad'
    factor_electricidad: {
      type: Number,
      required: true,
      min: 0,
    },
    // Mapeado de 'moneda'
    moneda: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // Sin timestamps ya que no figuran en la colección de referencia
    timestamps: false,
    collection: "FactoresPaises",
  },
);

module.exports = mongoose.model("FactorPais", factorPaisSchema);
