const express = require("express");
const router = express.Router();
const FactorPais = require("../models/FactorPais");

// GET - Listar todos los factores país
router.get("/", async (req, res) => {
  try {
    const data = await FactorPais.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener factores país",
      error: error.message,
    });
  }
});

// GET - Obtener factor país por ID de MongoDB (_id)
router.get("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ mensaje: "Factor país no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el factor país",
      error: error.message,
    });
  }
});

// POST - Crear factor país
router.post("/", async (req, res) => {
  try {
    const data = await FactorPais.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el factor país",
      error: error.message,
    });
  }
});

// PUT - Actualizar factor país
router.put("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ mensaje: "Factor país no encontrado" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el factor país",
      error: error.message,
    });
  }
});

// DELETE - Eliminar factor país
router.delete("/:id", async (req, res) => {
  try {
    const data = await FactorPais.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ mensaje: "Factor país no encontrado" });
    }

    res.json({ mensaje: "Factor país eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el factor país",
      error: error.message,
    });
  }
});

module.exports = router;
