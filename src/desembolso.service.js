import pool from "../db.js";
import { ejecutarTransferencia } from "./banco.mock.js";

export async function procesarDesembolso({ solicitudId }) {
  const qSelect = `
    SELECT estado, monto, cuenta_destino
    FROM solicitudes
    WHERE id = $1
  `;

  const result = await pool.query(qSelect, [solicitudId]);

  if (result.rowCount === 0) {
    throw new Error("Solicitud no encontrada");
  }

  const solicitud = result.rows[0];

  if (solicitud.estado !== "Firmado") {
    throw new Error("La solicitud no esta firmada");
  }

  const transferencia = await ejecutarTransferencia({
    monto: solicitud.monto,
    cuentaDestino: solicitud.cuenta_destino
  });

  if (!transferencia.ok) {
    const qError = `
      UPDATE solicitudes
      SET ultimo_error_desembolso = $2,
          fecha_ultimo_desembolso = NOW()
      WHERE id = $1
    `;
    await pool.query(qError, [solicitudId, transferencia.codigo]);

    return {
      ok: false,
      estadoPrestamo: "Firmado",
      error: transferencia.mensaje || "Error en transferencia"
    };
  }

  const qOk = `
    UPDATE solicitudes
    SET estado = 'Desembolsado',
        num_operacion_desembolso = $2,
        fecha_desembolso = $3
    WHERE id = $1
    RETURNING id, estado, num_operacion_desembolso, fecha_desembolso
  `;

  const upd = await pool.query(qOk, [
    solicitudId,
    transferencia.numOperacion,
    transferencia.fecha
  ]);

  const row = upd.rows[0];

  return {
    ok: true,
    estadoPrestamo: row.estado,
    numOperacion: row.num_operacion_desembolso,
    fecha: row.fecha_desembolso
  };
}
