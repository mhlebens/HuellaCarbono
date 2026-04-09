const express = require("express");
const router = express.Router();
const Reto = require("../models/Reto");

// GET - listar todos los retos
router.get("/", async (req, res) => {
  try {
    const data = await Reto.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener retos", error: error.message });
  }
});

// GET - obtener reto por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Reto.findById(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener reto", error: error.message });
  }
});

// POST - crear reto
router.post("/", async (req, res) => {
  try {
    const data = await Reto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear reto", error: error.message });
  }
});

// PUT - actualizar reto
router.put("/:id", async (req, res) => {
  try {
    const data = await Reto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar reto", error: error.message });
  }
});

// DELETE - eliminar reto
router.delete("/:id", async (req, res) => {
  try {
    const data = await Reto.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ mensaje: "Reto no encontrado" });
    res.json({ mensaje: "Reto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar reto", error: error.message });
  }
});

module.exports = router;
