function calcularPuntaje({ edad, ingresos, historial_crediticio, monto_solicitado, plazo }) {
  let puntaje = 0;
  let motivos = [];

  if (edad >= 21 && edad <= 65) {
    puntaje += 30;
  } else {
    puntaje -= 20;
    motivos.push("Edad fuera de rango (21-65)");
  }

  if (ingresos >= 500000) {
    puntaje += 40;
  } else if (ingresos >= 300000) {
    puntaje += 20;
  } else {
    puntaje -= 20;
    motivos.push("Ingresos insuficientes");
  }

  switch (historial_crediticio) {
    case "bueno":
      puntaje += 30;
      break;
    case "regular":
      puntaje += 10;
      break;
    case "malo":
      puntaje -= 30;
      motivos.push("Historial crediticio negativo");
      break;
    default:
      motivos.push("Historial no informado");
  }

  if (monto_solicitado > ingresos * 0.5) {
    puntaje -= 20;
    motivos.push("Monto solicitado alto respecto a ingresos");
  }

  if (plazo > 60) {
    puntaje -= 10;
    motivos.push("Plazo excesivo");
  }

  const decision = puntaje >= 50 ? "Aprobado" : "Rechazado";

  if (decision === "Aprobado" && motivos.length === 0) {
    motivos.push("Cumple criterios");
  }

  return { puntaje, decision, motivos };
}

module.exports = { calcularPuntaje };
