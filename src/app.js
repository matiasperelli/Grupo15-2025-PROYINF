const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const simulacionRoutes = require("./simulacion");

app.use(cors());
app.use(express.json());

// 🔹 IMPORTANTE: Usa "Public" con mayúscula
app.use(express.static(path.join(__dirname, "Public")));

app.use("/api", simulacionRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "Prototipo_Sistema_Grupo15.html"));
});

module.exports = app;
