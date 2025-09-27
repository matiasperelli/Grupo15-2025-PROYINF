def calcular_scoring(datos_cliente: dict) -> dict:
  
    puntaje = 50
    motivo = []

    ingreso = datos_cliente["ingreso"]
    deuda = datos_cliente["deuda"]
    edad = datos_cliente["edad"]
    historial = datos_cliente["historial"].lower()
    empleo_anios = datos_cliente["empleo_anios"]
    monto = datos_cliente["monto"]

    #relación deuda e ingreso
    ratio_dti = deuda / ingreso if ingreso > 0 else 1
    if ratio_dti < 0.3:
        puntaje += 20
    elif ratio_dti <= 0.5:
        puntaje += 10
    else:
        puntaje -= 20
        motivo.append("Relación deuda/ingreso demasiado alta")

    # rango de edad
    if edad < 21:
        puntaje -= 30
        motivo.append("Edad menor a 21 años")
    elif 21 <= edad <= 25:
        puntaje += 5
    elif 26 <= edad <= 60:
        puntaje += 15
    else:
        puntaje -= 10
        motivo.append("Edad fuera del rango ideal")

    # analizar historial crediticio
    if historial == "excelente":
        puntaje += 30
    elif historial == "bueno":
        puntaje += 20
    elif historial == "regular":
        puntaje += 5
    elif historial == "malo":
        puntaje -= 25
        motivo.append("Historial crediticio deficiente")

    # analisis de estabilidad laboral
    if empleo_anios < 1:
        puntaje -= 10
        motivo.append("Poca estabilidad laboral")
    elif 1 <= empleo_anios <= 3:
        puntaje += 5
    else:
        puntaje += 15

    # monto/ingreso
    ratio_monto = monto / ingreso if ingreso > 0 else 10
    if ratio_monto < 3:
        puntaje += 15
    elif ratio_monto <= 6:
        puntaje += 5
    else:
        puntaje -= 20
        motivo.append("Monto solicitado demasiado alto para sus ingresos")

    if puntaje >= 70:
        decision = "Aprobado"
    elif 60 <= puntaje < 70:
        decision = "Revisión manual"
        motivo.append("Caso requiere análisis adicional")
    else:
        decision = "Rechazado"

    return {
        "puntaje": puntaje,
        "decision": decision,
        "motivo": motivo if motivo else ["Cumple criterios"]
    }


if __name__ == "__main__":
