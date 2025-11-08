import { autenticarUsuario } from "./auth.mock.js";
import { guardarDocumentoFirmado } from "./storage.service.js";
import pool from "../db.js";

export async function procesarFirma({ solicitudId, hashDocumento, usuarioId, consentimiento }) {

    if (!consentimiento) {
        throw new Error("Debe otorgar consentimiento para firmar");
    }

    const queryEstado =
        `SELECT estado, contrato_pdf FROM solicitudes WHERE id = $1`;

    const result = await pool.query(queryEstado, [solicitudId]);

    if (result.rowCount === 0) {
        throw new Error("Solicitud no encontrada");
    }

    const solicitud = result.rows[0];

    if (solicitud.estado !== "Aprobada") {
        throw new Error("La solicitud no está aprobada");
    }

    const auth = await autenticarUsuario(usuarioId);

    if (!auth.ok) {
        return { autenticado: false, motivo: auth.error };
    }

    const firmadoBase64 = Buffer.from(
        `DocumentoHash: ${hashDocumento} | Usuario: ${usuarioId} | Timestamp: ${Date.now()}`
    ).toString("base64");

    const nombreArchivo = `firma_${solicitudId}_${Date.now()}.txt`;

    const { url } = guardarDocumentoFirmado(nombreArchivo, firmadoBase64);

    const q =
        `UPDATE solicitudes
         SET estado = 'Firmado', url_firma = $2, fecha_firma = NOW()
         WHERE id = $1 RETURNING id`;

    const upd = await pool.query(q, [solicitudId, url]);

    return {
        autenticado: true,
        idFirma: upd.rows[0].id,
        estado: "Firmado",
        urlDescarga: url
    };
}
