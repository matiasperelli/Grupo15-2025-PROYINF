const express = require("express");
const path = require("path");
const cors = require("cors");

const db = require("./db");
const simulacionRoutes = require("./simulacion");

const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck simple con verificación de DB
app.get("/api/health", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", db: "up" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", db: "down" });
  }
});

// Raíz del API
app.get("/api", (_req, res) => {
  res.json({
    name: "API Grupo 15",
    version: "v1",
    endpoints: [
      "GET  /api/health",
      "POST /api/evaluar",
      "GET  /api/simulaciones"
    ],
  });
});

// (Opcional) servir el prototipo estático si lo quieres visitar en /public/...
app.use("/public", express.static(path.join(__dirname, "Public")));

app.get("/", (_req, res) => {
  res.send("API del Sistema de Préstamos Digitales - Grupo 15");
});

// Rutas de negocio
app.use("/api", simulacionRoutes);

module.exports = app;
