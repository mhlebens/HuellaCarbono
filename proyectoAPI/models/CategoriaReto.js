const mongoose = require("mongoose");

// // 11. Colección CategoriasRetos (Para clasificar los retos)
// db.CategoriasRetos.insertOne({
//   id_categoria: 1,
//   nombre: "Movilidad Sostenible",
// });

const categoriaRetoSchema = new mongoose.Schema(
  {
    // Mapeado de 'id_categoria'
    id_categoria: {
      type: Number,
      required: true,
      unique: true,
    },
    // Mapeado de 'nombre'
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // Se desactivan los timestamps ya que no figuran en la colección
    timestamps: false,
    collection: "CategoriasRetos",
  },
);

module.exports = mongoose.model("CategoriaReto", categoriaRetoSchema);
