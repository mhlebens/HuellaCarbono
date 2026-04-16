const mongoose = require("mongoose");

// const user = db.Usuarios.findOne({ id_usuario: 1 });
// const reto = db.Retos.findOne({ id_reto: 1 });
// // 9. Colección ParticipacionesRetos (Une Usuarios con Retos)
// db.ParticipacionesRetos.insertOne({
//   id_participacion: 1,
//   usuario_id: user._id,
//   reto_id: reto._id,
//   estado: "En progreso",
//   fecha_inicio: new Date()
// });

const participacionRetoSchema = new mongoose.Schema(
  {
    // Mapeado de 'id_participacion'
    id_participacion: {
      type: Number,
      required: true,
      unique: true,
    },
    // Mapeado de 'usuario_id' (usando el _id de la colección Usuarios)
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    // Mapeado de 'reto_id' (usando el _id de la colección Retos)
    reto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reto",
      required: true,
    },
    // Mapeado de 'estado'
    estado: {
      type: String,
      required: true,
      enum: ["En progreso", "Completado", "Abandonado"],
      default: "En progreso",
    },
    // Mapeado de 'fecha_inicio'
    fecha_inicio: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "ParticipacionesRetos",
  },
);

module.exports = mongoose.model("ParticipacionReto", participacionRetoSchema);
