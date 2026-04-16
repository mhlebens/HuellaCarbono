const mongoose = require("mongoose");

// // 6. Colección RegistrosDiarios (Referencia al _id del Usuario)
// // Aquí usamos el _id del usuario creado anteriormente para la relación
// const user = db.Usuarios.findOne({ id_usuario: 1 });

// db.RegistrosDiarios.insertOne({
//   id_registro: 1,
//   usuario_id: user._id, // Referencia interna
//   fecha: "2024-05-20",
//   actividades: {
//     km_recorridos: 15,
//     tipo_transporte: "Bicicleta",
//     ducha_minutos: 10
//   }
// });

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
