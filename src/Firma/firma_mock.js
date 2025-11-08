export async function autenticarUsuario(usuarioId) {
    const random = Math.random();

    if (random < 0.9) {
        return { ok: true, usuarioId, metodo: "ClaveÚnica" };
    }

    return { ok: false, error: "Fallo en autenticación biométrica" };
}
