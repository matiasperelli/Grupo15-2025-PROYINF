const express = require("express");
const router = express.Router();
const db = require("./db");
const { calcularScoring } = require("./scoring");

router.post("/evaluar", async (req, res) => {
  try {
    const { monto, plazo, ingreso } = req.body;

    if (!monto || !plazo || !ingreso) {
      return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    const { score, estado, cuota } = calcularScoring(monto, plazo, ingreso);

    await db.query(
      "INSERT INTO simulaciones (monto, plazo, ingreso, score, estado, cuota) VALUES ($1, $2, $3, $4, $5, $6)",
      [monto, plazo, ingreso, score, estado, cuota]
    );

    return res.json({ monto, plazo, ingreso, cuota, score, estado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;


