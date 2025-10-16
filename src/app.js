const express = require("express");
const app = express();
const simulacionRoutes = require("./simulacion"); // 👈 cambia esta línea

app.use(express.json());
app.use("/api", simulacionRoutes);

app.get("/", (req, res) => {
  res.send("API del Sistema de Préstamos Digitales - Grupo 15");
});

module.exports = app;
