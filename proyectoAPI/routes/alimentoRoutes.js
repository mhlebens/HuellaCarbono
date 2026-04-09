const express = require("express");
const router = express.Router();
const Alimento = require("../models/Alimento");

router.get("/", async (req, res) => {
  try {
    const data = await Alimento.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alimentos", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Alimento.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Alimento no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alimento", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Alimento.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear alimento", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Alimento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Alimento no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar alimento", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Alimento.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Alimento no encontrado" });
    res.json({ mensaje: "Alimento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar alimento", error: error.message });
  }
});

module.exports = router;