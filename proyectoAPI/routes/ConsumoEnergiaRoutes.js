const express = require("express");
const router = express.Router();
const ConsumoEnergia = require("../models/ConsumoEnergia");

router.get("/", async (req, res) => {
  try {
    const data = await ConsumoEnergia.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener consumos de energía", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Consumo de energía no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener consumo de energía", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await ConsumoEnergia.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear consumo de energía", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Consumo de energía no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar consumo de energía", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Consumo de energía no encontrado" });
    res.json({ mensaje: "Consumo de energía eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar consumo de energía", error: error.message });
  }
});

module.exports = router;