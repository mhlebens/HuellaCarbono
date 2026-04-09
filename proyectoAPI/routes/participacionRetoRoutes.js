const express = require("express");
const router = express.Router();
const ParticipacionReto = require("../models/ParticipacionReto");

router.get("/", async (req, res) => {
  try {
    const data = await ParticipacionReto.find()
      .populate("usuarioId")
      .populate("retoId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener participaciones", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findById(req.params.id)
      .populate("usuarioId")
      .populate("retoId");
    if (!data) return res.status(404).json({ mensaje: "Participación no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener participación", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await ParticipacionReto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear participación", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ mensaje: "Participación no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar participación", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Participación no encontrada" });
    res.json({ mensaje: "Participación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar participación", error: error.message });
  }
});

module.exports = router;