const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const simulacionRoutes = require("./simulacion");

// Middlewares
app.use(cors());
app.use(express.json());

// Servir el frontend
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api", simulacionRoutes);

// Ruta principal (frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Prototipo_Sistema_Grupo15.html"));
});

module.exports = app;
