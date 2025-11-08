const app = require("./app");
const db = require("./db");

const PORT = process.env.PORT || 3000;

async function start() {
  // crear tabla si no existe
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS simulaciones (
        id SERIAL PRIMARY KEY,
        monto NUMERIC NOT NULL,
        plazo INTEGER NOT NULL,
        ingreso NUMERIC NOT NULL,
        score INTEGER NOT NULL,
        estado VARCHAR(20) NOT NULL,
        cuota NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✔ Tabla 'simulaciones' lista.");
  } catch (e) {
    console.error("Error creando tabla:", e);
  }

  app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`);
  });
}

start();
