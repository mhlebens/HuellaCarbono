const express = require("express");
const router = express.Router();
const CategoriaReto = require("../models/CategoriaReto");

// GET - Listar todas las categorías
router.get("/", async (req, res) => {
  try {
    const data = await CategoriaReto.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las categorías de retos",
      error: error.message,
    });
  }
});

// GET - Obtener categoría por ID de MongoDB (_id)
router.get("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Categoría de reto no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la categoría de reto",
      error: error.message,
    });
  }
});

// POST - Crear categoría
router.post("/", async (req, res) => {
  try {
    const data = await CategoriaReto.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la categoría de reto",
      error: error.message,
    });
  }
});

// PUT - Actualizar categoría
router.put("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Categoría de reto no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la categoría de reto",
      error: error.message,
    });
  }
});

// DELETE - Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const data = await CategoriaReto.findByIdAndDelete(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Categoría de reto no encontrada" });
    }
    res.json({ mensaje: "Categoría de reto eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la categoría de reto",
      error: error.message,
    });
  }
});

module.exports = router;
