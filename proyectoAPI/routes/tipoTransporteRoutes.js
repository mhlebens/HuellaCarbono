const express = require("express");
const router = express.Router();
const TipoTransporte = require("../models/TipoTransporte");

router.get("/", async (req, res) => {
  try {
    const data = await TipoTransporte.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tipos de transporte", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Tipo de transporte no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tipo de transporte", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await TipoTransporte.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear tipo de transporte", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Tipo de transporte no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar tipo de transporte", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await TipoTransporte.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Tipo de transporte no encontrado" });
    res.json({ mensaje: "Tipo de transporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar tipo de transporte", error: error.message });
  }
});

module.exports = router;