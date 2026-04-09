const express = require("express");
const router = express.Router();
const CalculoCO2 = require("../models/CalculoCO2");

router.get("/", async (req, res) => {
  try {
    const data = await CalculoCO2.find()
      .populate("usuarioId")
      .populate("recomendacionesGeneradas");
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cálculos CO2", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await CalculoCO2.findById(req.params.id)
      .populate("usuarioId")
      .populate("recomendacionesGeneradas");
    if (!data) return res.status(404).json({ mensaje: "Cálculo CO2 no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cálculo CO2", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await CalculoCO2.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear cálculo CO2", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await CalculoCO2.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Cálculo CO2 no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar cálculo CO2", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await CalculoCO2.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Cálculo CO2 no encontrado" });
    res.json({ mensaje: "Cálculo CO2 eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar cálculo CO2", error: error.message });
  }
});

module.exports = router;