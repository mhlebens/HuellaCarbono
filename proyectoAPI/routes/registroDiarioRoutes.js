const express = require("express");
const router = express.Router();
const RegistroDiario = require("../models/RegistroDiario");

// GET - listar todos los registros diarios
router.get("/", async (req, res) => {
  try {
    const data = await RegistroDiario.find().populate("usuario_id");
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener registros diarios",
        error: error.message,
      });
  }
});

// GET - obtener registro diario por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findById(req.params.id).populate(
      "usuario_id",
    );
    if (!data)
      return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener registro diario",
        error: error.message,
      });
  }
});

// POST - crear registro diario
router.post("/", async (req, res) => {
  try {
    const data = await RegistroDiario.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al crear registro diario",
        error: error.message,
      });
  }
});

// PUT - actualizar registro diario
router.put("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!data)
      return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al actualizar registro diario",
        error: error.message,
      });
  }
});

// DELETE - eliminar registro diario
router.delete("/:id", async (req, res) => {
  try {
    const data = await RegistroDiario.findByIdAndDelete(req.params.id);
    if (!data)
      return res.status(404).json({ mensaje: "Registro diario no encontrado" });
    res.json({ mensaje: "Registro diario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al eliminar registro diario",
        error: error.message,
      });
  }
});

module.exports = router;
