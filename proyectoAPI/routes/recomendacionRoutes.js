const express = require("express");
const router = express.Router();
const Recomendacion = require("../models/Recomendacion");

router.get("/", async (req, res) => {
  try {
    const data = await Recomendacion.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener recomendaciones", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Recomendacion.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Recomendación no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener recomendación", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Recomendacion.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear recomendación", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Recomendacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Recomendación no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar recomendación", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Recomendacion.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Recomendación no encontrada" });
    res.json({ mensaje: "Recomendación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar recomendación", error: error.message });
  }
});

module.exports = router;