const express = require("express");
const router = express.Router();
const CategoriaReto = require("../models/CategoriaReto");

router.get("/", async (req, res) => {
  try {
    const data = await CategoriaReto.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categorías de retos", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Categoría de reto no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categoría de reto", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await CategoriaReto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear categoría de reto", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Categoría de reto no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar categoría de reto", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Categoría de reto no encontrada" });
    res.json({ mensaje: "Categoría de reto eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar categoría de reto", error: error.message });
  }
});

module.exports = router;