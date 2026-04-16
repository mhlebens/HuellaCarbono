const mongoose = require("mongoose");

// const user = db.Usuarios.findOne({ id_usuario: 1 });
// // 7. Colección CalculosCO2 (Resultados procesados)
// db.CalculosCO2.insertOne({
//   id_calculo: 1,
//   usuario_id: user._id,
//   mes: "Mayo",
//   total_emisiones: 120.5,
//   unidad: "kg"
// });

const calculoCO2Schema = new mongoose.Schema(
  {
    id_calculo: {
      type: Number,
      required: true
    },
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    mes: {
      type: String,
      required: true,
      trim: true
    },
    total_emisiones: {
      type: Number,
      required: true,
      min: 0
    },
    unidad: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: false,
    collection: "CalculosCO2"
  }
);

module.exports = mongoose.model("CalculoCO2", calculoCO2Schema);