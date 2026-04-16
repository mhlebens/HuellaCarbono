const express = require("express");
const router = express.Router();
const TipoTransporte = require("../models/TipoTransporte");

// 1. Obtener todos
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

// 2. Obtener uno solo por _id (Corregido para app.js)
router.get("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error", error: error.message });
  }
});

// 3. Crear
router.post("/", async (req, res) => {
  try {
    const data = await TipoTransporte.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear", error: error.message });
  }
});

// 4. Actualizar (PUT) - Cambiado a findByIdAndUpdate
router.put("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar", error: error.message });
  }
});

// 5. Eliminar (DELETE) - Cambiado a findByIdAndDelete
router.delete("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar", error: error.message });
  }
});

module.exports = router;
