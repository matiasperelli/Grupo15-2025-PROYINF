// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const calcularScoring = require('./scoring');

const app = express();
app.use(cors());
app.use(express.json());

// Página principal (prototipo)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Prototipo_Sistema_Grupo15.html'));
});

// Catálogo de endpoints
app.get('/api', (req, res) => {
  res.json({
    name: 'API Grupo 15',
    version: 'v1',
    endpoints: ['GET  /api/health', 'POST /api/evaluar', 'GET  /api/simulaciones']
  });
});

// Healthcheck
app.get('/api/health', async (req, res) => {
  try { await db.query('SELECT 1'); res.json({ status: 'ok', db: 'up' }); }
  catch { res.status(500).json({ status: 'ok', db: 'down' }); }
});

// LISTAR simulaciones (FIX: usar app.get y created_at)
app.get('/api/simulaciones', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT id, monto, plazo, ingreso, score, estado, cuota,
             created_at AS creado_en
      FROM simulaciones
      ORDER BY created_at DESC NULLS LAST, id DESC
      LIMIT 50
    `);
    res.json(rows);
  } catch (err) {
    console.error('GET /api/simulaciones failed:', err);
    res.status(500).json({ error: 'Error al consultar simulaciones.' });
  }
});

// EVALUAR y guardar simulación
app.post('/api/evaluar', async (req, res) => {
  try {
    const { monto, plazo, ingreso } = req.body;
    if (!monto || !plazo || !ingreso) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }
    const { score, estado, cuota } = calcularScoring(monto, plazo, ingreso);
    await db.query(
      `INSERT INTO simulaciones (monto, plazo, ingreso, score, estado, cuota)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [monto, plazo, ingreso, score, estado, cuota]
    );
    res.json({ monto, plazo, ingreso, score, estado, cuota });
  } catch (err) {
    console.error('POST /api/evaluar failed:', err);
    res.status(500).json({ error: 'No se pudo evaluar.' });
  }
});

module.exports = app;
