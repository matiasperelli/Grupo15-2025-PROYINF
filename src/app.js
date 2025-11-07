// src/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const simulacionRoutes = require("./simulacion");

const app = express();

app.use(cors());              // habilita CORS para pruebas
app.use(express.json());      // parsea JSON
app.use(express.urlencoded({ extended: true }));

// servir la landing del prototipo (HU1/HU2/HU4)
app.use(express.static(path.join(__dirname, "Public")));
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "Public", "Prototipo_Sistema_Grupo15.html"));
});

// healthcheck simple
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// rutas de negocio
app.use("/api", simulacionRoutes);

module.exports = app;
