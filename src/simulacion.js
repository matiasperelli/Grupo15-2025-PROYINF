const express = require("express");
const router = express.Router();

const db = require("./db");
const { calcularScoring } = require("./scoring");

// POST /api/evaluar  → calcula y guarda
router.post("/evaluar", async (req, res) => {
  try {
    const { monto, plazo, ingreso } = req.body;

    if (monto == null || plazo == null || ingreso == null) {
      return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    const { score, estado, cuota } =
      calcularScoring(Number(monto), Number(plazo), Number(ingreso));

    await db.query(
      `INSERT INTO simulaciones (monto, plazo, ingreso, score, estado, cuota)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [monto, plazo, ingreso, score, estado, Number(cuota)]
    );

    res.json({ monto, plazo, ingreso, cuota, score, estado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// GET /api/simulaciones  → últimas 50
router.get("/simulaciones", async (_req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, monto, plazo, ingreso, score, estado, cuota, created_at
       FROM simulaciones
       ORDER BY id DESC
       LIMIT 50`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar simulaciones." });
  }
});

module.exports = router;
