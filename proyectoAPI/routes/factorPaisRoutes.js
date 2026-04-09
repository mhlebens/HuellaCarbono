const express = require("express");
const router = express.Router();
const FactorPais = require("../models/FactorPais");

router.get("/", async (req, res) => {
  try {
    const data = await FactorPais.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener factores país", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Factor país no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener factor país", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await FactorPais.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear factor país", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Factor país no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar factor país", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Factor país no encontrado" });
    res.json({ mensaje: "Factor país eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar factor país", error: error.message });
  }
});

module.exports = router;