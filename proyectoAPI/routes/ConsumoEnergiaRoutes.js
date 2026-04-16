const express = require("express");
const router = express.Router();
const ConsumoEnergia = require("../models/ConsumoEnergia");

// GET - Listar todos los consumos
router.get("/", async (req, res) => {
  try {
    const data = await ConsumoEnergia.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener consumos de energía",
      error: error.message,
    });
  }
});

// GET - Obtener un consumo por ID de MongoDB (_id)
router.get("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Consumo de energía no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el consumo de energía",
      error: error.message,
    });
  }
});

// POST - Crear un nuevo consumo
router.post("/", async (req, res) => {
  try {
    const data = await ConsumoEnergia.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el consumo de energía",
      error: error.message,
    });
  }
});

// PUT - Actualizar un consumo por ID
router.put("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Consumo de energía no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el consumo de energía",
      error: error.message,
    });
  }
});

// DELETE - Eliminar un consumo
router.delete("/:id", async (req, res) => {
  try {
    const data = await ConsumoEnergia.findByIdAndDelete(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ mensaje: "Consumo de energía no encontrado" });
    }
    res.json({ mensaje: "Consumo de energía eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el consumo de energía",
      error: error.message,
    });
  }
});

module.exports = router;
