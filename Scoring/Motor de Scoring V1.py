def calcular_scoring(datos_cliente: dict) -> dict:
  
    puntaje = 50
    motivo = []

    #la primera regla es la relación entre la deduda y el ingreso
    if datos_cliente["deuda"] > 0.5 * datos_cliente["ingreso"]:
        puntaje -= 30
        motivo.append("Deuda alta respecto a ingresos")

    #luego se clasifica según la edad
    if datos_cliente["edad"] < 21:
        puntaje -= 40
        motivo.append("Edad menor a 21 años")

    #finalmente se considera el historial crediticio
    historial = datos_cliente["historial"].lower()
    if historial == "bueno":
        puntaje += 30
    elif historial == "regular":
        puntaje += 10
    elif historial == "malo":
        puntaje -= 20
        motivo.append("Historial crediticio malo")

    #se aprueba o rechaza la solicitud
    decision = "Aprobado" if puntaje >= 70 else "Rechazado"

    return {
        "puntaje": puntaje,
        "decision": decision,
        "motivo": motivo if decision == "Rechazado" else ["Cumple requisitos"]
    }
