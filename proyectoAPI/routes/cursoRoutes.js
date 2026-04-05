const express = require("express");
const router = express.Router();
const Curso = require("../models/Curso");

// GET - listar cursos
router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cursos" });
  }
});

// POST - agregar curso
router.post("/", async (req, res) => {
  try {
    const nuevoCurso = new Curso(req.body);
    const cursoGuardado = await nuevoCurso.save();
    res.status(201).json(cursoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear curso", error: error.message });
  }
});

// PUT - actualizar curso
router.put("/:id", async (req, res) => {
  try {
    const cursoActualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!cursoActualizado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.json(cursoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar curso", error: error.message });
  }
});

// DELETE - eliminar curso
router.delete("/:id", async (req, res) => {
  try {
    const cursoEliminado = await Curso.findByIdAndDelete(req.params.id);

    if (!cursoEliminado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.json({ mensaje: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar curso", error: error.message });
  }
});

module.exports = router;