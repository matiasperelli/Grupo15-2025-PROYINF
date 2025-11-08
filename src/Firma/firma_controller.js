import { procesarFirma } from "./firma.service.js";

export async function postFirma(req, res) {
    try {
        const { solicitudId, hashDocumento, usuarioId, consentimiento } = req.body;

        const result = await procesarFirma({
            solicitudId,
            hashDocumento,
            usuarioId,
            consentimiento
        });

        if (!result.autenticado) {
            return res.status(401).json({
                ok: false,
                mensaje: "Fallo en autenticación",
                motivo: result.motivo
            });
        }

        return res.json({
            ok: true,
            mensaje: "Contrato firmado",
            data: result
        });

    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err.message
        });
    }
}
