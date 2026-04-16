const mongoose = require("mongoose");

// // 1. Colección Usuarios
// db.Usuarios.insertOne({
//   id_usuario: 1,
//   nombre: "Ana Martínez",
//   email: "ana@example.com",
//   fecha_registro: new Date(),
//   perfil: { pais: "México", nivel_conciencia: "Principiante" }
// });

// Subdocumento para el campo perfil
const perfilSchema = new mongoose.Schema(
  {
    pais: {
      type: String,
      required: true,
      trim: true,
    },
    nivel_conciencia: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }, // perfil no necesita su propio _id
);

const usuarioSchema = new mongoose.Schema(
  {
    id_usuario: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fecha_registro: {
      type: Date,
      default: null,
    },
    perfil: {
      type: perfilSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Usuarios",
  },
);

module.exports = mongoose.model("Usuario", usuarioSchema);
