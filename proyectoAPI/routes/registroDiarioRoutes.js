const express = require("express");
const router = express.Router();
const RegistroDiario = require("../models/RegistroDiario");

router.get("/", async (req, res) => {
  try {
    const data = await RegistroDiario.find()
      .populate("usuarioId")
      .populate("transporte.tipoTransporteId")
      .populate("alimentos.alimentoId")
      .populate("energia.consumoEnergiaId");

    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener registros diarios", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findById(req.params.id)
      .populate("usuarioId")
      .populate("transporte.tipoTransporteId")
      .populate("alimentos.alimentoId")
      .populate("energia.consumoEnergiaId");

    if (!data) return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener registro diario", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await RegistroDiario.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear registro diario", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar registro diario", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json({ mensaje: "Registro diario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar registro diario", error: error.message });
  }
});

module.exports = router;