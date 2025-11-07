// src/simulacion.js
const express = require("express");
const router = express.Router();
const db = require("./db");
const { calcularScoring } = require("./scoring");

// HU1/HU4: simular y evaluar
router.post("/evaluar", async (req, res) => {
  try {
    const { monto, plazo, ingreso } = req.body;

    if (
      monto === undefined || plazo === undefined || ingreso === undefined ||
      Number(monto) <= 0 || Number(plazo) <= 0 || Number(ingreso) <= 0
    ) {
      return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    const { score, estado, cuota } = calcularScoring(
      Number(monto),
      Number(plazo),
      Number(ingreso)
    );

    const insert = await db.query(
      `INSERT INTO simulaciones (monto, plazo, ingreso, score, estado, cuota)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [monto, plazo, ingreso, score, estado, cuota]
    );

    const id = insert.rows[0].id;

    return res.json({ id, monto, plazo, ingreso, cuota, score, estado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// HU3 (consulta por id)
router.get("/simulaciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const r = await db.query(
      `SELECT id, monto, plazo, ingreso, score, estado, cuota, created_at
       FROM simulaciones WHERE id = $1`,
      [id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: "Simulación no encontrada" });
    }
    res.json(r.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// HU3 (listado con filtros/paginación)
router.get("/simulaciones", async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(Number(req.query.limit) || 20, 100));
    const offset = Math.max(0, Number(req.query.offset) || 0);
    const { estado } = req.query;

    let where = "";
    const params = [];
    if (estado) {
      params.push(estado);
      where = `WHERE estado = $${params.length}`;
    }

    params.push(limit, offset);
    const list = await db.query(
      `SELECT id, monto, plazo, ingreso, score, estado, cuota, created_at
       FROM simulaciones
       ${where}
       ORDER BY created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    const count = await db.query(
      `SELECT COUNT(*) AS total FROM simulaciones ${where}`,
      estado ? [estado] : []
    );

    res.json({
      items: list.rows,
      pagination: { limit, offset, total: Number(count.rows[0].total) },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;
