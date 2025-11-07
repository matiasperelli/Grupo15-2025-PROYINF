const express = require("express");
const cors = require("cors");
const app = express();
const simulacionRoutes = require("./simulacion");

app.use(cors());
app.use(express.json());
app.use("/api", simulacionRoutes);

app.get("/", (req, res) => {
  res.send("API del Sistema de Préstamos Digitales - Grupo 15");
});

module.exports = app;
