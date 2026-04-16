const express = require("express");
const router = express.Router();
const ParticipacionReto = require("../models/ParticipacionReto");

// GET - Listar todas las participaciones con datos relacionados
router.get("/", async (req, res) => {
  try {
    const data = await ParticipacionReto.find()
      .populate("usuario_id")
      .populate("reto_id");
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener participaciones en retos",
      error: error.message,
    });
  }
});

// GET - Obtener participación por ID de MongoDB (_id)
router.get("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findById(req.params.id)
      .populate("usuario_id")
      .populate("reto_id");
    if (!data) {
      return res.status(404).json({ mensaje: "Participación no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la participación",
      error: error.message,
    });
  }
});

// POST - Crear participación
router.post("/", async (req, res) => {
  try {
    const data = await ParticipacionReto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la participación",
      error: error.message,
    });
  }
});

// PUT - Actualizar participación
router.put("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!data) {
      return res.status(404).json({ mensaje: "Participación no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la participación",
      error: error.message,
    });
  }
});

// DELETE - Eliminar participación
router.delete("/:id", async (req, res) => {
  try {
    const data = await ParticipacionReto.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ mensaje: "Participación no encontrada" });
    }
    res.json({ mensaje: "Participación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la participación",
      error: error.message,
    });
  }
});

module.exports = router;
