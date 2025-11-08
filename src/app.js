// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const calcularScoring = require('./scoring');

const app = express();
app.use(express.json());
app.use(cors());

// === SERVIR FRONT (HTML + estáticos) ===
const PUBLIC_DIR = path.join(__dirname, 'Public');
app.use(express.static(PUBLIC_DIR)); // css/js si los agregas
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'Prototipo_Sistema_Grupo15.html'));
});

// === ENDPOINTS API ===
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch {
    res.status(500).json({ status: 'error', db: 'down' });
  }
});

app.get('/api', (req, res) => {
  res.json({
    name: 'API Grupo 15',
    version: 'v1',
    endpoints: ['GET  /api/health', 'POST /api/evaluar', 'GET  /api/simulaciones']
  });
});

app.post('/api/evaluar', async (req, res) => {
  try {
    const { monto, plazo, ingreso } = req.body;
    if (!monto || !plazo || !ingreso) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }
    const { score, estado, cuota } = calcularScoring(monto, plazo, ingreso);
    await db.query(
      `CREATE TABLE IF NOT EXISTS simulaciones(
         id SERIAL PRIMARY KEY,
         monto INT NOT NULL,
         plazo INT NOT NULL,
         ingreso INT NOT NULL,
         score INT NOT NULL,
         estado TEXT NOT NULL,
         cuota INT NOT NULL,
         creado_en TIMESTAMP DEFAULT NOW()
       )`
    );
    await db.query(
      `INSERT INTO simulaciones (monto, plazo, ingreso, score, estado, cuota)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [monto, plazo, ingreso, score, estado, cuota]
    );
    res.json({ monto, plazo, ingreso, score, estado, cuota });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al evaluar.' });
  }
});

app.get('/api/simulaciones', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, monto, plazo, ingreso, score, estado, cuota, creado_en
       FROM simulaciones ORDER BY creado_en DESC LIMIT 50`
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al consultar simulaciones.' });
  }
});

module.exports = app;
