const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const simulacionRoutes = require("./simulacion");

// Middlewares
app.use(cors());
app.use(express.json());

// Servir el HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "Prototipo_Sistema_Grupo15.html"));
});

// Rutas de la API
app.use("/api", simulacionRoutes);

module.exports = app;
