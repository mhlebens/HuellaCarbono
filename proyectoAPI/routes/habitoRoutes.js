const express = require("express");
const router = express.Router();
const Habito = require("../models/Habito");

router.get("/", async (req, res) => {
  try {
    const data = await Habito.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener hábitos", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Habito.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Hábito no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener hábito", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Habito.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear hábito", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Habito.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Hábito no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar hábito", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Habito.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Hábito no encontrado" });
    res.json({ mensaje: "Hábito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar hábito", error: error.message });
  }
});

module.exports = router;