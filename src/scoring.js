// src/scoring.js
function calcularScoring(monto, plazo, ingreso) {
  const tasaMensual = 0.015; // 1.5% mensual
  const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
  const porcentaje = cuota / ingreso;

  const score = Math.max(0, Math.round(100 - porcentaje * 100));
  let estado = "Rechazado";
  if (score >= 60) estado = "Preaprobado";

  return { score, estado, cuota: cuota.toFixed(2) };
}

module.exports = { calcularScoring };
