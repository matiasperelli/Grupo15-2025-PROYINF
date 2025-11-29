import { procesarDesembolso } from "./desembolso.service.js";

export async function postDesembolso(req, res) {
  try {
    const { solicitudId } = req.body;

    if (!solicitudId) {
      return res.status(400).json({
        ok: false,
        error: "Falta solicitudId"
      });
    }

    const resultado = await procesarDesembolso({ solicitudId });

    if (!resultado.ok) {
      return res.status(502).json({
        ok: false,
        mensaje: "Error en desembolso",
        detalle: resultado.error
      });
    }

    return res.json({
      ok: true,
      mensaje: "Desembolso realizado",
      data: resultado
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: err.message
    });
  }
}
