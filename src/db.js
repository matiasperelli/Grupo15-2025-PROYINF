// src/db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "mi_base",
  port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
  console.log("✅ Conexión a PostgreSQL establecida");
});

async function ensureSchema() {
  // Crea la tabla si no existe (no necesita recrear la base)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS simulaciones (
      id SERIAL PRIMARY KEY,
      monto NUMERIC NOT NULL,
      plazo INT NOT NULL,
      ingreso NUMERIC NOT NULL,
      score INT NOT NULL,
      estado TEXT NOT NULL,
      cuota NUMERIC NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  ensureSchema,
};
