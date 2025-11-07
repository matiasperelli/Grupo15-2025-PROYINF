// src/index.js
const app = require("./app");
const db = require("./db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.ensureSchema();
    app.listen(PORT, () => {
      console.log(`🚀 App corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("No se pudo iniciar la app:", err);
    process.exit(1);
  }
})();
