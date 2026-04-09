const express = require("express");
const router = express.Router();
const TipoTransporte = require("../models/TipoTransporte");

// 1. Obtener todos (Para cargar la tabla o el select en la web)
router.get("/", async (req, res) => {
  try {
    const data = await TipoTransporte.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener datos", error: error.message });
  }
});

// 2. Obtener uno solo por su ID numérico
router.get("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findOne({ id_transporte: req.params.id });
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error", error: error.message });
  }
});

// 3. Crear (POST)
router.post("/", async (req, res) => {
  try {
    const data = await TipoTransporte.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear", error: error.message });
  }
});

// 4. Actualizar (PUT) - Buscando por id_transporte
router.put("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findOneAndUpdate(
      { id_transporte: req.params.id },
      req.body,
      { new: true },
    );
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar", error: error.message });
  }
});

// 5. Eliminar (DELETE) - Buscando por id_transporte
router.delete("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findOneAndDelete({
      id_transporte: req.params.id,
    });
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar", error: error.message });
  }
});

module.exports = router;
