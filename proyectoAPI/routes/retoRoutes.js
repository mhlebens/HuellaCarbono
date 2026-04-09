const express = require("express");
const router = express.Router();
const Reto = require("../models/Reto");

router.get("/", async (req, res) => {
  try {
    const data = await Reto.find().populate("categoriaRetoId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener retos", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Reto.findById(req.params.id).populate("categoriaRetoId");
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reto", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Reto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear reto", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Reto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar reto", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Reto.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json({ mensaje: "Reto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar reto", error: error.message });
  }
});

module.exports = router;